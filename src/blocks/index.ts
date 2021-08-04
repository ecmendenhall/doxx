export type SaveState = "new" | "changed" | "saving" | "saved";

export interface Page {
  id: string;
  type: "page";
  properties: {
    title: string[][];
  };
  content: string[];
  format: {
    page_icon: string;
  };
  parent: string;
  saveState: SaveState;
}

export interface BlockIndex {
  blocks: string[];
}

export interface PageIndex {
  pages: string[];
}

export type Block = Page;
