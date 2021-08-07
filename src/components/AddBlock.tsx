import { useEffect, useRef, useState } from "react";
import { BlockType, createEmptyBlock } from "../blocks";
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
      <ul className="p-1 divide-y divide-gray-200 rounded-lg shadow-md cursor-pointer">
        <li className="hover:bg-gray-100" onMouseDown={() => onClick("page")}>
          📑 Page
        </li>
        <li className="hover:bg-gray-100" onMouseDown={() => onClick("text")}>
          ✍️ Text
        </li>
        <li
          className="hover:bg-gray-100"
          onMouseDown={() => onClick("heading-1")}
        >
          👉 Heading 1
        </li>
        <li
          className="hover:bg-gray-100"
          onMouseDown={() => onClick("heading-2")}
        >
          👉 Heading 2
        </li>
        <li
          className="hover:bg-gray-100"
          onMouseDown={() => onClick("heading-3")}
        >
          👉 Heading 3
        </li>
        <li className="hover:bg-gray-100" onMouseDown={() => {}}>
          🖼 Image
        </li>
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

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const onItemSelected = (type: BlockType) => {
    const block = createEmptyBlock(type);
    newBlock(block, page);
    if (idx.status === "done" && ceramic.status === "done" && page) {
      saveNewBlock(idx.idx, ceramic.ceramic, block, page);
    }
    setTimeout(() => setMenuActive(false), 5);
  };

  const onBlur = () => {
    setMenuActive(false);
  };

  return (
    <div className="my-4 relative" onBlur={onBlur}>
      <Button onClick={toggleMenu} primary={false}>
        <span>+</span> Add block
      </Button>
      <BlockMenu active={menuActive} onClick={onItemSelected} />
    </div>
  );
};

export default AddBlock;
