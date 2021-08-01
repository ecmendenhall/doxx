import CeramicClient from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { IDX } from "@ceramicstudio/idx";
import { Block, BlockIndex, Page, PageIndex } from "../blocks";
import { schemas } from "../config/deployedSchemas.json";

const loadBlocks = async (idx: IDX, ceramic: CeramicClient) => {
  const blockIdsResponse = await idx.get<{ blocks: Array<string> }>("blocks");
  const blockIds = blockIdsResponse?.blocks ?? [];
  const queries = blockIds.map((id) => {
    return { streamId: id };
  });
  const blocksResponse = await ceramic.multiQuery(queries);
  let blocks = new Map<string, Block>();
  for (const key in blocksResponse) {
    let id = `ceramic://${key}`;
    blocks.set(id, {
      id: id,
      ...blocksResponse[key].state.content,
    });
  }
  console.log(blocks);
  return blocks;
};

const loadPages = async (idx: IDX, ceramic: CeramicClient) => {
  const pageIdsResponse = await idx.get<{ pages: Array<string> }>("pages");
  const pageIds = pageIdsResponse?.pages ?? [];
  const queries = pageIds.map((id) => {
    return { streamId: id };
  });
  const pagesResponse = await ceramic.multiQuery(queries);
  let pages = new Map<string, Page>();
  for (const key in pagesResponse) {
    let id = `ceramic://${key}`;
    pages.set(id, {
      id: id,
      ...pagesResponse[key].state.content,
    });
  }
  console.log(pages);
  return pages;
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
  return [newBlock.id.toString(), newBlock] as const;
};

const createPage = async (idx: IDX, ceramic: CeramicClient, page: Page) => {
  const [_id, newPage] = await createBlock(idx, ceramic, page);
  const pageIndex = await idx.get<PageIndex>("pages");
  const pages = pageIndex?.pages ?? [];
  await idx.set("pages", {
    pages: [...pages, newPage.id.toUrl()],
  });
  return [newPage.id.toString(), newPage] as const;
};

const loadProfile = async (idx: IDX, caip10Id: string) => {
  return await idx.get("basicProfile", caip10Id);
};

const exp = {
  loadPages,
  loadBlocks,
  createPage,
  createBlock,
  loadProfile,
};

export default exp;
