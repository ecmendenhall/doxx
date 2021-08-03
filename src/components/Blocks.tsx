import { Block } from "../blocks";
import Page from "../blocks/Page";
import useApp from "../hooks/useApp";

const Blocks = () => {
  const {
    state: { blocks, activePage },
  } = useApp();

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "page":
        return <Page {...block} />;
      default:
        return <div></div>;
    }
  };

  const renderBlocks = (blockIds: string[]) => {
    return blockIds.map((id: string) => {
      const block = blocks.blocks.get(id);
      return block && renderBlock(block);
    });
  };

  if (activePage) {
    return <div>{renderBlocks(activePage.content)}</div>;
  } else {
    return <div></div>;
  }
};

export default Blocks;
