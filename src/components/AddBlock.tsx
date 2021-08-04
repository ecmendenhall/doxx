import { useState } from "react";
import {
  BlockType,
  createEmptyHeading,
  createEmptyPage,
  createEmptyText,
} from "../blocks";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";
import Button from "./ui/Button";

interface Props {
  active: boolean;
  onClick: (type: BlockType) => void;
}

const BlockMenu = ({ active, onClick }: Props) => {
  const className = `absolute ${active ? "block" : "hidden"}`;
  return (
    <div className={className}>
      <ul>
        <li onClick={() => onClick("page")}>Page</li>
        <li onClick={() => onClick("text")}>Text</li>
        <li onClick={() => onClick("heading")}>Heading</li>
      </ul>
    </div>
  );
};

const AddBlock = () => {
  const {
    state: { idx, ceramic },
    newBlock,
    saveNewBlock,
  } = useApp();
  const { page } = useActivePage();
  const [menuActive, setMenuActive] = useState(false);

  const openMenu = () => {
    setMenuActive(true);
  };

  const emptyPageByType = {
    page: createEmptyPage,
    text: createEmptyText,
    heading: createEmptyHeading,
  };

  const onItemSelected = (type: BlockType) => {
    if (idx.status === "done" && ceramic.status === "done" && page) {
      const block = emptyPageByType[type]();
      newBlock(block, page);
      saveNewBlock(idx.idx, ceramic.ceramic, block, page);
    }
    setTimeout(() => setMenuActive(false), 5);
  };

  return (
    <div className="relative">
      <Button onClick={openMenu} primary={false}>
        <span>+</span> Add block
      </Button>
      <BlockMenu active={menuActive} onClick={onItemSelected} />
    </div>
  );
};

export default AddBlock;
