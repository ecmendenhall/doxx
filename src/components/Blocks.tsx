import { Block } from "../blocks";
import Heading from "../blocks/Heading";
import Page from "../blocks/Page";
import Text from "../blocks/Text";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";

const Blocks = () => {
  const {
    state: {
      blocks: { blocks, drafts },
    },
  } = useApp();
  const { page } = useActivePage();

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "page":
        return <Page block={block} key={block.key} />;
      case "text":
        return <Text block={block} key={block.key} />;
      case "heading-1":
        return <Heading block={block} key={block.key} />;
      case "heading-2":
        return <Heading block={block} key={block.key} />;
      case "heading-3":
        return <Heading block={block} key={block.key} />;
      default:
        return <div></div>;
    }
  };

  const renderBlocks = (blockIds: string[]) => {
    return blockIds.map((id: string) => {
      const block = blocks.get(id) || drafts.get(id);
      return block && renderBlock(block);
    });
  };

  const blocksAndDrafts = page ? [...page.content, ...page.drafts] : [];

  return <div>{page && renderBlocks(blocksAndDrafts)}</div>;
};

export default Blocks;
