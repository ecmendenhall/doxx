import { v4 as uuid } from "uuid";

export type SaveState = "new" | "changed" | "saving" | "saved";
export type BlockType = "page" | "text" | HeadingType;
export type HeadingType = "heading-1" | "heading-2" | "heading-3";

export interface Page {
  id: string;
  type: "page";
  properties: {
    title: string[][];
  };
  content: string[];
  format: {
    page_icon?: string;
  };
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface Text {
  id: string;
  type: "text";
  properties: {
    title: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface Heading {
  id: string;
  type: HeadingType;
  properties: {
    title: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
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
    drafts: [],
    key: uuid(),
    controllers: [],
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
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyHeading = (type: HeadingType): Heading => {
  return {
    id: uuid(),
    saveState: "new",
    type: type,
    properties: {
      title: [[""]],
    },
    content: [],
    format: {},
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyBlock = (type: BlockType) => {
  switch (type) {
    case "page":
      return createEmptyPage();
    case "text":
      return createEmptyText();
    case "heading-1":
      return createEmptyHeading("heading-1");
    case "heading-2":
      return createEmptyHeading("heading-2");
    case "heading-3":
      return createEmptyHeading("heading-3");
  }
};
