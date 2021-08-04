import { v4 as uuid } from "uuid";
export type SaveState = "new" | "changed" | "saving" | "saved";
export type BlockType = "page" | "text" | "heading";

export interface Page {
  id: string;
  type: BlockType;
  properties: {
    title: string[][];
  };
  content: string[];
  format: {
    page_icon?: string;
  };
  parent: string;
  saveState: SaveState;
}

export interface Text {
  id: string;
  type: BlockType;
  properties: {
    title: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
}

export interface Heading {
  id: string;
  type: BlockType;
  properties: {
    title: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
}

export interface BlockIndex {
  blocks: string[];
}

export interface PageIndex {
  pages: string[];
}

export type Block = Page | Text | Heading;

export const createEmptyPage = (): Page => {
  return {
    id: uuid(),
    saveState: "new",
    type: "page",
    properties: {
      title: [["New Page"]],
    },
    content: [],
    format: {
      page_icon: "📑",
    },
    parent: "",
  };
};

export const createEmptyText = (): Text => {
  return {
    id: uuid(),
    saveState: "new",
    type: "text",
    properties: {
      title: [[""]],
    },
    content: [],
    format: {},
    parent: "",
  };
};

export const createEmptyHeading = (): Text => {
  return {
    id: uuid(),
    saveState: "new",
    type: "heading",
    properties: {
      title: [[""]],
    },
    content: [],
    format: {},
    parent: "",
  };
};
