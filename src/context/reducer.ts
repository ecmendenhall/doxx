import CeramicClient from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Block, Page } from "../blocks";

type PendingStatus = "pending" | "loading";

type ProviderPendingState = { status: PendingStatus };
type ProviderFailedState = { status: "failed"; error: Error };
export type ProviderLoadedState = {
  status: "done";
  provider: Web3Provider;
  signer: JsonRpcSigner;
  address: string;
  ensName: string;
};
type ProviderState =
  | ProviderPendingState
  | ProviderFailedState
  | ProviderLoadedState;

type IDXPendingState = { status: PendingStatus };
type IDXFailedState = { status: "failed"; error: Error };
type IDXDoneState = { status: "done"; idx: IDX };

type IDXState = IDXPendingState | IDXFailedState | IDXDoneState;

type CeramicPendingState = { status: PendingStatus };
type CeramicFailedState = {
  status: "failed";
  error: Error;
};
export type CeramicLoadedState = {
  status: "done";
  ceramic: CeramicClient;
};
export type CeramicState =
  | CeramicPendingState
  | CeramicFailedState
  | CeramicLoadedState;

type BlocksPendingState = { status: PendingStatus; blocks: Map<string, Block> };
type BlocksFailedState = {
  status: "failed";
  error: Error;
  blocks: Map<string, Block>;
};
type BlocksLoadedState = { status: "done"; blocks: Map<string, Block> };
type BlocksState = BlocksPendingState | BlocksFailedState | BlocksLoadedState;
type ActiveBlockState = Block | null;

type PagesPendingState = { status: PendingStatus; pages: Map<string, Page> };
type PagesFailedState = {
  status: "failed";
  error: Error;
  pages: Map<string, Page>;
};
type PagesLoadedState = { status: "done"; pages: Map<string, Page> };
type PagesState = PagesPendingState | PagesFailedState | PagesLoadedState;
type ActivePageState = Block | null;

export interface State {
  provider: ProviderState;
  ceramic: CeramicState;
  idx: IDXState;
  pages: PagesState;
  blocks: BlocksState;
  activeBlock: ActiveBlockState;
  activePage: ActivePageState;
}

export type LoadProvider = { type: "provider loading" };
export type LoadProviderFailed = { type: "provider failed"; error: Error };
export type SetProvider = {
  type: "provider loaded";
  provider: Web3Provider;
  signer: JsonRpcSigner;
  address: string;
  ensName: string;
};
export type ProviderAction = LoadProvider | LoadProviderFailed | SetProvider;

export type LoadCeramic = { type: "ceramic loading" };
export type LoadCeramicFailed = { type: "ceramic failed"; error: Error };
export type SetCeramic = { type: "ceramic loaded"; ceramic: CeramicClient };
export type CeramicAction = LoadCeramic | LoadCeramicFailed | SetCeramic;

export type AuthenticateIDX = { type: "idx authenticating" };
export type AuthenticateIDXFailed = {
  type: "idx auth failed";
  error: Error;
};
export type IDXAuthenticated = {
  type: "idx authenticated";
  idx: IDX;
};
export type IDXAuthAction =
  | AuthenticateIDX
  | AuthenticateIDXFailed
  | IDXAuthenticated;

export type LoadBlocks = { type: "blocks loading" };
export type LoadBlocksFailed = { type: "blocks failed"; error: Error };
export type SetBlocks = { type: "blocks loaded"; blocks: Map<string, Block> };
export type BlocksAction = LoadBlocks | LoadBlocksFailed | SetBlocks;

export type SetActiveBlock = { type: "set active block"; block: Block };

export type LoadPages = { type: "pages loading" };
export type LoadPagesFailed = { type: "pages failed"; error: Error };
export type SetPages = { type: "pages loaded"; pages: Map<string, Page> };
export type PagesAction = LoadPages | LoadPagesFailed | SetPages;

export type SetActivePage = { type: "set active page"; page: Block };

export type Action =
  | ProviderAction
  | CeramicAction
  | IDXAuthAction
  | BlocksAction
  | PagesAction
  | SetActiveBlock
  | SetActivePage;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "provider loading":
      return {
        ...state,
        provider: { status: "loading" },
      };
    case "provider loaded":
      return {
        ...state,
        provider: {
          status: "done",
          provider: action.provider,
          signer: action.signer,
          address: action.address,
          ensName: action.ensName,
        },
      };
    case "provider failed":
      return {
        ...state,
        provider: { status: "failed", error: action.error },
      };
    case "ceramic loading":
      return {
        ...state,
        ceramic: { status: "loading" },
      };
    case "ceramic loaded":
      return {
        ...state,
        ceramic: {
          status: "done",
          ceramic: action.ceramic,
        },
      };
    case "ceramic failed":
      return {
        ...state,
        ceramic: {
          status: "failed",
          error: action.error,
        },
      };
    case "idx authenticating":
      return {
        ...state,
        idx: { status: "loading" },
      };
    case "idx authenticated":
      return {
        ...state,
        idx: {
          status: "done",
          idx: action.idx,
        },
      };
    case "idx auth failed":
      return {
        ...state,
        idx: {
          status: "failed",
          error: action.error,
        },
      };
    case "blocks loading":
      return {
        ...state,
        blocks: { ...state.blocks, status: "loading" },
      };
    case "blocks loaded":
      return {
        ...state,
        blocks: { status: "done", blocks: action.blocks },
      };
    case "blocks failed":
      return {
        ...state,
        blocks: { ...state.blocks, status: "failed", error: action.error },
      };
    case "pages loading":
      return {
        ...state,
        pages: { ...state.pages, status: "loading" },
      };
    case "pages loaded":
      return {
        ...state,
        pages: { status: "done", pages: action.pages },
      };
    case "pages failed":
      return {
        ...state,
        pages: { ...state.pages, status: "failed", error: action.error },
      };
    case "set active block":
      return {
        ...state,
        activeBlock: action.block,
      };
    case "set active page":
      return {
        ...state,
        activePage: action.page,
      };
    default:
      return state;
  }
};

export const initialState: State = {
  provider: { status: "pending" },
  ceramic: { status: "pending" },
  idx: { status: "pending" },
  pages: { status: "pending", pages: new Map<string, Page>() },
  blocks: { status: "pending", blocks: new Map<string, Block>() },
  activeBlock: null,
  activePage: null,
};
