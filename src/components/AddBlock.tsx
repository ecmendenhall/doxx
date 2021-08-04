import { createEmptyPage } from "../blocks";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";
import Button from "./ui/Button";

const AddBlock = () => {
  const {
    state: { idx, ceramic },
    newBlock,
    saveNewBlock,
  } = useApp();
  const { page } = useActivePage();

  const onClick = () => {
    if (idx.status === "done" && ceramic.status === "done" && page) {
      const block = createEmptyPage();
      newBlock(block, page);
      saveNewBlock(idx.idx, ceramic.ceramic, block, page);
    }
  };

  return (
    <Button onClick={onClick} primary={false}>
      <span>+</span> Add block
    </Button>
  );
};

export default AddBlock;
