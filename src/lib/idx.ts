import CeramicClient from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { IDX } from "@ceramicstudio/idx";
import { Block, BlockIndex, Page, PageIndex } from "../blocks";
import { schemas } from "../config/deployedSchemas.json";
import ceramic from "./ceramic";

export type BlockParams = Omit<Block, "id" | "saveState">;
export type PageParams = Omit<Page, "id" | "saveState">;

const loadBlocks = async (idx: IDX, ceramicClient: CeramicClient) => {
  const blockIdsResponse = await idx.get<{ blocks: Array<string> }>("blocks");
  const blockIds = blockIdsResponse?.blocks ?? [];
  const blocksResponse = await ceramic.readBlocks(ceramicClient, blockIds);
  let blocks = new Map<string, Block>();
  blocksResponse.forEach((block) => {
    blocks.set(block.id, { ...block, saveState: "saved" });
  });
  console.log(blocks);
  return blocks;
};

const loadPages = async (idx: IDX, ceramicClient: CeramicClient) => {
  const pageIdsResponse = await idx.get<{ pages: Array<string> }>("pages");
  const pageIds = pageIdsResponse?.pages ?? [];
  const pagesResponse = await ceramic.readBlocks(ceramicClient, pageIds);
  let pages = new Map<string, Page>();
  pagesResponse.forEach((page) => {
    pages.set(page.id, { ...page, saveState: "saved" });
  });
  console.log(pages);
  return pages;
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
  console.log(id);
  return await updateBlock(ceramic, page, id);
};

const loadProfile = async (idx: IDX, caip10Id: string) => {
  return await idx.get("basicProfile", caip10Id);
};

const exp = {
  loadPages,
  loadBlocks,
  createPage,
  updatePage,
  createBlock,
  updateBlock,
  loadProfile,
};

export default exp;
