import { useRef, useEffect, useCallback } from "react";

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

export const useRefCallback = <T extends any[]>(
  value: ((...args: T) => void) | undefined,
  deps?: React.DependencyList
): ((...args: T) => void) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, deps ?? [value]);

  const result = useCallback((...args: T) => {
    ref.current?.(...args);
  }, []);

  return result;
};
