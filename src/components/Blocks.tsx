import { Block } from "../blocks";
import Page from "../blocks/Page";
import useApp from "../hooks/useApp";

const Blocks = () => {
  const {
    state: {
      blocks: { blocks, drafts },
      activePage,
    },
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
      const block = blocks.get(id);
      return block && renderBlock(block);
    });
  };

  if (activePage) {
    const page = blocks.get(activePage) || drafts.get(activePage);
    if (page) {
      return <div>{renderBlocks(page.content)}</div>;
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

export default Blocks;
