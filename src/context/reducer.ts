import CeramicClient from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { EditorState } from "draft-js";
import { Block } from "../blocks";

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

type BlocksPendingState = {
  status: PendingStatus;
  blocks: Map<string, Block>;
  drafts: Map<string, Block>;
};
type BlocksFailedState = {
  status: "failed";
  error: Error;
  blocks: Map<string, Block>;
  drafts: Map<string, Block>;
};
type BlocksLoadedState = {
  status: "done";
  blocks: Map<string, Block>;
  drafts: Map<string, Block>;
};
type BlocksState = BlocksPendingState | BlocksFailedState | BlocksLoadedState;

type PagesPendingState = {
  status: PendingStatus;
  pageIds: string[];
  draftIds: string[];
};
type PagesFailedState = {
  status: "failed";
  error: Error;
  pageIds: string[];
  draftIds: string[];
};
type PagesLoadedState = {
  status: "done";
  pageIds: string[];
  draftIds: string[];
};
type PagesState = PagesPendingState | PagesFailedState | PagesLoadedState;

type ActivePageState = string;
type ActiveBlockState = string;

type EditorStates = Map<string, EditorState>;

export interface State {
  provider: ProviderState;
  ceramic: CeramicState;
  idx: IDXState;
  pages: PagesState;
  blocks: BlocksState;
  activePage: ActivePageState;
  activeBlock: ActiveBlockState;
  editorStates: EditorStates;
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
export type SetBlocks = {
  type: "blocks loaded";
  blocks: Map<string, Block>;
};
export type NewBlock = { type: "new block"; block: Block };
export type SaveBlock = { type: "save block"; block: Block };
export type SaveDraftBlock = { type: "save draft block"; block: Block };
export type SetBlock = { type: "set block"; block: Block };
export type SetDraftBlock = { type: "set draft block"; block: Block };
export type SaveDraftBlockComplete = {
  type: "save draft block complete";
  block: Block;
  savedBlock: Block;
};
export type SaveBlockComplete = {
  type: "save block complete";
  block: Block;
  savedBlock: Block;
};
export type SetActiveBlock = { type: "set active block"; blockId: string };

export type BlocksAction =
  | LoadBlocks
  | LoadBlocksFailed
  | SetBlocks
  | NewBlock
  | SetBlock
  | SaveBlock
  | SetDraftBlock
  | SaveDraftBlock
  | SaveDraftBlockComplete
  | SaveBlockComplete
  | SetActiveBlock;

export type LoadPages = { type: "pages loading" };
export type LoadPagesFailed = { type: "pages failed"; error: Error };
export type SetPages = { type: "pages loaded"; pageIds: string[] };
export type NewPage = { type: "new page"; pageId: string };
export type SavePageComplete = {
  type: "save page complete";
  pageId: string;
  savedPageId: string;
};
export type SetActivePage = { type: "set active page"; pageId: string };

export type PagesAction =
  | LoadPages
  | LoadPagesFailed
  | SetPages
  | NewPage
  | SavePageComplete
  | SetActivePage;

export type EditorStateAction = {
  type: "set editor state";
  key: string;
  editorState: EditorState;
};

export type Action =
  | ProviderAction
  | CeramicAction
  | IDXAuthAction
  | BlocksAction
  | PagesAction
  | EditorStateAction;

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
        blocks: { ...state.blocks, status: "done", blocks: action.blocks },
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
        pages: { ...state.pages, status: "done", pageIds: action.pageIds },
      };
    case "pages failed":
      return {
        ...state,
        pages: { ...state.pages, status: "failed", error: action.error },
      };
    case "new page":
      return {
        ...state,
        pages: {
          ...state.pages,
          draftIds: [...state.pages.draftIds, action.pageId],
        },
      };
    case "new block":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          drafts: state.blocks.drafts.set(action.block.id, action.block),
        },
      };
    case "set block":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          blocks: state.blocks.blocks.set(action.block.id, action.block),
        },
      };
    case "set draft block":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          drafts: state.blocks.drafts.set(action.block.id, action.block),
        },
      };
    case "save block":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          blocks: state.blocks.blocks.set(action.block.id, {
            ...action.block,
            saveState: "saving",
          }),
        },
      };
    case "save draft block":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          drafts: state.blocks.drafts.set(action.block.id, {
            ...action.block,
            saveState: "saving",
          }),
        },
      };
    case "save draft block complete":
      const newDrafts = new Map(state.blocks.drafts);
      newDrafts.delete(action.block.id);
      return {
        ...state,
        blocks: {
          ...state.blocks,
          blocks: state.blocks.blocks.set(action.savedBlock.id, {
            ...action.savedBlock,
            key: action.block.key,
          }),
          drafts: newDrafts,
        },
      };
    case "save block complete":
      return {
        ...state,
        blocks: {
          ...state.blocks,
          blocks: state.blocks.blocks.set(action.savedBlock.id, {
            ...action.savedBlock,
            saveState: "saved",
          }),
        },
      };
    case "save page complete":
      const newDraftIds = state.pages.draftIds.filter(
        (id) => id !== action.pageId
      );
      return {
        ...state,
        pages: {
          ...state.pages,
          pageIds: [...state.pages.pageIds, action.savedPageId],
          draftIds: newDraftIds,
        },
      };
    case "set active page":
      return {
        ...state,
        activePage: action.pageId,
      };
    case "set active block":
      return {
        ...state,
        activeBlock: action.blockId,
      };
    case "set editor state":
      return {
        ...state,
        editorStates: state.editorStates.set(action.key, action.editorState),
      };
    default:
      return state;
  }
};

export const initialState: State = {
  provider: { status: "pending" },
  ceramic: { status: "pending" },
  idx: { status: "pending" },
  pages: { status: "pending", pageIds: [], draftIds: [] },
  activePage: "",
  blocks: {
    status: "pending",
    blocks: new Map<string, Block>(),
    drafts: new Map<string, Block>(),
  },
  activeBlock: "",
  editorStates: new Map<string, EditorState>(),
};
