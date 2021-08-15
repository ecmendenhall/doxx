import { useState } from "react";
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
      <ul className="divide-y divide-gray-200 rounded-lg shadow-md cursor-pointer">
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("page")}
        >
          📑 Page
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("text")}
        >
          ✍️ Text
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("heading-1")}
        >
          🥇 Heading 1
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("heading-2")}
        >
          🥈 Heading 2
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("heading-3")}
        >
          🥉 Heading 3
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("image")}
        >
          🖼 Image
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("file")}
        >
          📎 File
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("callout")}
        >
          📣 Callout
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("divider")}
        >
          📏 Divider
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("bookmark")}
        >
          📚 Bookmark
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("embed")}
        >
          🛌 Embed
        </li>
        <li
          className="p-2 hover:bg-gray-100"
          onMouseDown={() => onClick("nft")}
        >
          🎨 NFT
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
