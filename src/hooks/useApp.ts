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
        const pages = await idx.loadPages(idxClient, ceramic);
        dispatch({ type: "pages loaded", pages: pages });
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

  const setActiveBlock = useCallback(
    (block: Block) => {
      dispatch({ type: "set active block", block: block });
    },
    [dispatch]
  );

  const setActivePage = useCallback(
    (page: Page) => {
      dispatch({ type: "set active page", page: page });
    },
    [dispatch]
  );

  const newPage = useCallback(
    (page: Page) => {
      dispatch({ type: "new page", page: page });
    },
    [dispatch]
  );

  const saveNewPage = useCallback(
    async (idxClient: IDX, ceramic: CeramicClient, page: Page) => {
      dispatch({ type: "save page", page: page });
      const { id, saveState, ...pageParams } = page;
      const savedPage = await idx.createPage(idxClient, ceramic, pageParams);
      dispatch({
        type: "save page complete",
        page: page,
        savedPage: savedPage,
      });
    },
    [dispatch]
  );

  const savePage = useCallback(
    async (ceramic: CeramicClient, page: Page) => {
      dispatch({ type: "save page", page: page });
      const { id, saveState, ...pageParams } = page;
      await idx.updatePage(ceramic, pageParams, id);
      dispatch({
        type: "save page complete",
        page: page,
        savedPage: page,
      });
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
    setActiveBlock,
    setActivePage,
    newPage,
    saveNewPage,
    savePage,
  };
}

export default useApp;
