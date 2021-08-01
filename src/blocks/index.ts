type Page = NewPage | SavedPage;

interface NewPage {
  type: "page";
  properties: {
    title: string[][];
  };
  content: string[];
  format: {
    page_icon: string;
  };
  parent: string;
}

type SavedPage = NewPage & { id: string };

export interface BlockIndex {
  blocks: string[];
}

export type Block = Page;
