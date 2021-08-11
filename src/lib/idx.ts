import CeramicClient from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { IDX } from "@ceramicstudio/idx";
import { Block, BlockIndex, Page, PageIndex } from "../blocks";
import { schemas } from "../config/deployedSchemas.json";
import ceramic from "./ceramic";
import { BasicProfile, CryptoAccounts } from "@ceramicstudio/idx-constants";

export type BlockParams = Omit<
  Block,
  "id" | "saveState" | "drafts" | "key" | "editorState" | "controllers"
>;
export type PageParams = Omit<
  Page,
  "id" | "saveState" | "drafts" | "key" | "editorState" | "controllers"
>;

const loadBlocks = async (idx: IDX, ceramicClient: CeramicClient) => {
  const blockIdsResponse = await idx.get<{ blocks: Array<string> }>("blocks");
  const blockIds = blockIdsResponse?.blocks ?? [];
  const blocksResponse = await ceramic.readBlocks(ceramicClient, blockIds);
  let blocks = new Map<string, Block>();
  blocksResponse.forEach((block) => {
    blocks.set(block.id, block);
  });
  return blocks;
};

const loadPages = async (idx: IDX, ceramicClient: CeramicClient) => {
  const pageIdsResponse = await idx.get<{ pages: Array<string> }>("pages");
  const pageIds = pageIdsResponse?.pages ?? [];
  return pageIds;
};

const createBlock = async (
  idx: IDX,
  ceramic: CeramicClient,
  block: BlockParams
) => {
  const newBlock = await TileDocument.create(ceramic, block, {
    controllers: [idx.id],
    schema: schemas.Block,
  });
  const blockIndex = await idx.get<BlockIndex>("blocks");
  const blocks = blockIndex?.blocks ?? [];
  await idx.set("blocks", {
    blocks: [...blocks, newBlock.id.toUrl()],
  });
  const savedBlock: Block = {
    id: newBlock.id.toUrl(),
    ...newBlock.state.content,
  };
  return savedBlock;
};

const updateBlock = async (
  ceramic: CeramicClient,
  block: BlockParams,
  id: string
) => {
  console.log(ceramic.did);
  const savedBlock = await ceramic.loadStream<TileDocument>(id);
  await savedBlock.update(block);
};

const createPage = async (
  idx: IDX,
  ceramic: CeramicClient,
  page: PageParams
) => {
  const savedPage = await createBlock(idx, ceramic, page);
  const pageIndex = await idx.get<PageIndex>("pages");
  const pages = pageIndex?.pages ?? [];
  await idx.set("pages", {
    pages: [...pages, savedPage.id],
  });
  return savedPage;
};

const updatePage = async (
  ceramic: CeramicClient,
  page: PageParams,
  id: string
) => {
  return await updateBlock(ceramic, page, id);
};

const loadProfile = async (idx: IDX, caip10Id: string) => {
  return await idx.get<BasicProfile>("basicProfile", caip10Id);
};

const saveProfile = async (idx: IDX, profile: BasicProfile) => {
  return await idx.set("basicProfile", profile);
};

const loadAccounts = async (idx: IDX, did: string) => {
  return await idx.get<CryptoAccounts>("cryptoAccounts", did);
};

const caip10FromAddress = (address: string) => {
  return `${address}@eip155:1`.toLowerCase();
};

const exp = {
  loadPages,
  loadBlocks,
  createPage,
  updatePage,
  createBlock,
  updateBlock,
  loadProfile,
  loadAccounts,
  caip10FromAddress,
  saveProfile,
};

export default exp;
