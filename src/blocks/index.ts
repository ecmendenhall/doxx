import { v4 as uuid } from "uuid";

export type SaveState = "new" | "changed" | "saving" | "saved";
export type BlockType =
  | "image"
  | "page"
  | "text"
  | "callout"
  | "divider"
  | "file"
  | "bookmark"
  | "embed"
  | "nft"
  | HeadingType;
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

export interface Callout {
  id: string;
  type: "callout";
  properties: {
    title: string[][];
  };
  content: string[];
  format: {
    icon: string;
  };
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

export interface Image {
  id: string;
  type: "image";
  properties: {
    title: string[][];
    source: string[][];
  };
  content: string[];
  format: {
    width: number;
    height: number;
  };
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface File {
  id: string;
  type: "file";
  properties: {
    title: string[][];
    source: string[][];
    size: number[][];
    type: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface Bookmark {
  id: string;
  type: "bookmark";
  properties: {
    title: string[][];
    source: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface Embed {
  id: string;
  type: "embed";
  properties: {
    title: string[][];
    source: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface NFT {
  id: string;
  type: "nft";
  properties: {
    title: string[][];
    source: string[][];
    id: string[][];
  };
  content: string[];
  format: {};
  parent: string;
  saveState: SaveState;
  drafts: string[];
  key: string;
  controllers: string[];
}

export interface Divider {
  id: string;
  type: "divider";
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

export type TextBlock = Text | Heading | Callout;
export type Block =
  | Page
  | Image
  | File
  | Divider
  | Bookmark
  | Embed
  | NFT
  | TextBlock;

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

export const createEmptyImage = (): Image => {
  return {
    id: uuid(),
    saveState: "new",
    type: "image",
    properties: {
      title: [[""]],
      source: [[]],
    },
    content: [],
    format: {
      width: 300,
      height: 200,
    },
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyFile = (): File => {
  return {
    id: uuid(),
    saveState: "new",
    type: "file",
    properties: {
      title: [[""]],
      source: [[]],
      size: [[]],
      type: [[]],
    },
    content: [],
    format: {},
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyBookmark = (): Bookmark => {
  return {
    id: uuid(),
    saveState: "new",
    type: "bookmark",
    properties: {
      title: [[""]],
      source: [[]],
    },
    content: [],
    format: {},
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyEmbed = (): Embed => {
  return {
    id: uuid(),
    saveState: "new",
    type: "embed",
    properties: {
      title: [[""]],
      source: [[]],
    },
    content: [],
    format: {},
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyNFT = (): NFT => {
  return {
    id: uuid(),
    saveState: "new",
    type: "nft",
    properties: {
      title: [[""]],
      source: [[]],
      id: [[]],
    },
    content: [],
    format: {},
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyCallout = (): Callout => {
  return {
    id: uuid(),
    saveState: "new",
    type: "callout",
    properties: {
      title: [[""]],
    },
    content: [],
    format: {
      icon: "📣",
    },
    parent: "",
    drafts: [],
    key: uuid(),
    controllers: [],
  };
};

export const createEmptyDivider = (): Divider => {
  return {
    id: uuid(),
    saveState: "new",
    type: "divider",
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
    case "image":
      return createEmptyImage();
    case "file":
      return createEmptyFile();
    case "callout":
      return createEmptyCallout();
    case "divider":
      return createEmptyDivider();
    case "bookmark":
      return createEmptyBookmark();
    case "embed":
      return createEmptyEmbed();
    case "nft":
      return createEmptyNFT();
  }
};
