import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { fromString } from "uint8arrays";
import { DID } from "dids";
import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import { Web3Provider } from "@ethersproject/providers";
import { IDX } from "@ceramicstudio/idx";
import * as IDXTools from "@ceramicstudio/idx-tools";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Schema } from "../schemas";
import { definitions } from "../config/deployedSchemas.json";
import { Block } from "../blocks";
import { BlockParams } from "./idx";
import BlockSchema from "../schemas/eth.doxx.Block";

const API_URL = "https://ceramic-clay.3boxlabs.com";
const ceramic = new CeramicClient(API_URL);
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic),
};
const CERAMIC_DID = new DID({ resolver });

const loadClient = async () => {
  await ceramic.setDID(CERAMIC_DID);
  return ceramic;
};

const getReadOnlyIDX = () => {
  let ceramic = new CeramicClient("https://gateway.ceramic.network");
  return new IDX({ ceramic, aliases: definitions });
};

const authenticateUser = async (provider: Web3Provider) => {
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const threeIdConnect = new ThreeIdConnect();
  const authProvider = new EthereumAuthProvider(provider.provider, address);
  await threeIdConnect.connect(authProvider);
  const didProvider = await threeIdConnect.getDidProvider();
  ceramic.did?.setProvider(didProvider);
  await ceramic.did?.authenticate();
  const idx = new IDX({ ceramic, aliases: definitions });
  return idx;
};

const authenticateApp = async (seed: string) => {
  const seedArray = fromString(seed, "base16");
  const provider = new Ed25519Provider(seedArray);
  const did = new DID({ provider, resolver });
  await ceramic.setDID(did);
  await ceramic.did?.authenticate();
};

const publishSchema = async (ceramic: CeramicClient, schema: Schema) => {
  const publishedSchema = await IDXTools.publishSchema(ceramic, {
    name: schema.title,
    content: schema,
  });
  return publishedSchema;
};

const publishDefinition = async (
  ceramic: CeramicClient,
  definitionName: string,
  definitionDescription: string,
  schema: TileDocument
) => {
  return await IDXTools.createDefinition(ceramic, {
    name: definitionName,
    description: definitionDescription,
    schema: schema.commitId.toUrl(),
  });
};

const readBlock = async (
  ceramic: CeramicClient,
  blockId: string
): Promise<Block> => {
  const blockResponse = await ceramic.loadStream<TileDocument>(blockId);
  const content = blockResponse.content as BlockParams;
  console.log("content");
  console.log(content);
  return {
    id: blockId,
    saveState: "saved",
    ...content,
  };
};

const readBlocks = async (
  ceramic: CeramicClient,
  blockIds: string[]
): Promise<Block[]> => {
  /* Multiqueries don't seem to return latest state?
  const queries = blockIds.map((id) => {
    return { streamId: id };
  });
  const blocksResponse = await ceramic.multiQuery(queries);
  let blocks = [];
  for (const key in blocksResponse) {
    let id = `ceramic://${key}`;
    let stream = blocksResponse[key];
    blocks.push({
      id: id,
      ...blocksResponse[key].state.content,
    });
  }
  */
  let blocks: Block[] = [];
  for (const id of blockIds) {
    const block = await readBlock(ceramic, id);
    blocks.push(block);
  }
  return blocks;
};

const exp = {
  loadClient,
  authenticateUser,
  authenticateApp,
  publishSchema,
  publishDefinition,
  getReadOnlyIDX,
  readBlocks,
  readBlock,
};

export default exp;
