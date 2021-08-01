import CeramicClient from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { IDX } from "@ceramicstudio/idx";
import { Block, BlockIndex } from "../blocks";
import { schemas } from "../config/deployedSchemas.json";

const loadBlocks = async (idx: IDX, ceramic: CeramicClient) => {
  const blockIdsResponse = await idx.get<{ blocks: Array<string> }>("blocks");
  const blockIds = blockIdsResponse?.blocks ?? [];
  const queries = blockIds.map((id) => {
    return { streamId: id };
  });
  const blocksResponse = await ceramic.multiQuery(queries);
  let blocks = [];
  for (const key in blocksResponse) {
    blocks.push({
      id: `ceramic://${key}`,
      ...blocksResponse[key].state.content,
    });
  }
  console.log(blocks);
  return blocks;
};

const createBlock = async (idx: IDX, ceramic: CeramicClient, block: Block) => {
  const newBlock = await TileDocument.create(ceramic, block, {
    controllers: [idx.id],
    schema: schemas.Block,
  });
  const blockIndex = await idx.get<BlockIndex>("blocks");
  const blocks = blockIndex?.blocks ?? [];
  await idx.set("blocks", {
    blocks: [...blocks, newBlock.id.toUrl()],
  });
  return newBlock.id.toString();
};

const loadProfile = async (idx: IDX, caip10Id: string) => {
  return await idx.get("basicProfile", caip10Id);
};

const exp = {
  loadBlocks,
  createBlock,
  loadProfile,
};

export default exp;
