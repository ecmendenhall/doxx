import { useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext";
import eth from "../lib/eth";
import ceramic from "../lib/ceramic";
import { Web3Provider } from "@ethersproject/providers";
import { IDX } from "@ceramicstudio/idx";
import idx from "../lib/idx";
import CeramicClient from "@ceramicnetwork/http-client";
import { Block, Page } from "../blocks";

function useApp() {
  const { state, dispatch } = useContext(AppContext);

  const loadProvider = useCallback(async () => {
    try {
      dispatch({ type: "provider loading" });
      const [provider, signer, address, ensName] = await eth.loadProvider();
      dispatch({
        type: "provider loaded",
        provider: provider,
        signer: signer,
        address: address,
        ensName: ensName,
      });
    } catch (err) {
      dispatch({ type: "provider failed", error: err });
    }
  }, [dispatch]);

  const loadPages = useCallback(
    async (idxClient: IDX, ceramic: CeramicClient) => {
      try {
        dispatch({ type: "pages loading" });
        const pageIds = await idx.loadPages(idxClient, ceramic);
        dispatch({ type: "pages loaded", pageIds: pageIds });
      } catch (err) {
        dispatch({ type: "pages failed", error: err });
      }
    },
    [dispatch]
  );

  const loadBlocks = useCallback(
    async (idxClient: IDX, ceramic: CeramicClient) => {
      try {
        dispatch({ type: "blocks loading" });
        const blocks = await idx.loadBlocks(idxClient, ceramic);
        dispatch({ type: "blocks loaded", blocks: blocks });
      } catch (err) {
        dispatch({ type: "blocks failed", error: err });
      }
    },
    [dispatch]
  );

  const loadIDX = useCallback(
    async (provider: Web3Provider) => {
      try {
        dispatch({ type: "idx authenticating" });
        const client = await ceramic.authenticateUser(provider);
        dispatch({ type: "idx authenticated", idx: client });
      } catch (err) {
        dispatch({ type: "idx auth failed", error: err });
      }
    },
    [dispatch]
  );

  const loadCeramic = useCallback(async () => {
    try {
      dispatch({ type: "ceramic loading" });
      const client = await ceramic.loadClient();
      dispatch({ type: "ceramic loaded", ceramic: client });
    } catch (err) {
      dispatch({ type: "ceramic failed", error: err });
    }
  }, [dispatch]);

  const saveNewPage = useCallback(
    async (idxClient: IDX, ceramic: CeramicClient, page: Page) => {
      dispatch({ type: "new page", pageId: page.id });
      dispatch({ type: "new block", block: page });
      dispatch({ type: "save draft block", block: page });
      const { id, saveState, ...pageParams } = page;
      const savedPage = await idx.createPage(idxClient, ceramic, pageParams);
      dispatch({
        type: "save block complete",
        block: page,
        savedBlock: savedPage,
      });
      dispatch({
        type: "save page complete",
        pageId: page.id,
        savedPageId: savedPage.id,
      });
    },
    [dispatch]
  );

  const newBlock = useCallback(
    (block: Block, parent: Block) => {
      dispatch({ type: "new block", block: block });
      const updatedParent = {
        ...parent,
        content: [...parent.content, block.id],
      };
      dispatch({ type: "set block", block: updatedParent });
    },
    [dispatch]
  );

  const saveNewBlock = useCallback(
    async (
      idxClient: IDX,
      ceramic: CeramicClient,
      block: Block,
      parent: Block
    ) => {
      dispatch({ type: "save block", block: parent });
      dispatch({ type: "save draft block", block: block });
      const { id: blockId, saveState: blockSaveState, ...blockParams } = block;
      const savedBlock = await idx.createBlock(idxClient, ceramic, {
        ...blockParams,
        parent: parent.id,
      });
      const updatedParent = {
        ...parent,
        content: [...parent.content, savedBlock.id],
      };
      const {
        id: parentId,
        saveState: parentSaveState,
        ...parentParams
      } = updatedParent;
      await idx.updateBlock(ceramic, parentParams, parentId);
      dispatch({
        type: "save block complete",
        block: block,
        savedBlock: savedBlock,
      });
      dispatch({
        type: "save block complete",
        block: parent,
        savedBlock: updatedParent,
      });
    },
    [dispatch]
  );

  const saveBlock = useCallback(
    async (ceramic: CeramicClient, block: Block) => {
      dispatch({ type: "save block", block: block });
      const { id, saveState, ...blockParams } = block;
      await idx.updateBlock(ceramic, blockParams, id);
      dispatch({
        type: "save block complete",
        block: block,
        savedBlock: block,
      });
    },
    [dispatch]
  );

  const setBlock = useCallback(
    async (block: Block) => {
      dispatch({ type: "set block", block: block });
    },
    [dispatch]
  );

  const setActivePage = useCallback(
    async (pageId: string) => {
      dispatch({ type: "set active page", pageId: pageId });
    },
    [dispatch]
  );

  return {
    state,
    loadProvider,
    loadCeramic,
    loadIDX,
    loadPages,
    loadBlocks,
    saveNewPage,
    newBlock,
    saveNewBlock,
    saveBlock,
    setBlock,
    setActivePage,
  };
}

export default useApp;
