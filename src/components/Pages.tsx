import { Block } from "../blocks";
import Page from "../blocks/Page";
import useApp from "../hooks/useApp";

interface Props {
  enabled: boolean;
}

const Pages = ({ enabled }: Props) => {
  const {
    state: {
      blocks: { blocks, drafts, deleting },
      pages: { pageIds, draftIds },
    },
  } = useApp();

  const renderPage = (block: Block) => {
    switch (block.type) {
      case "page":
        return <Page block={block} key={block.key} enabled={enabled} />;
      default:
        return <div></div>;
    }
  };

  const renderBlocks = (blockIds: string[]) => {
    return blockIds
      .filter((id: string) => !deleting.includes(id))
      .map((id: string) => {
        const block = blocks.get(id) || drafts.get(id);
        return (
          block && (
            <div className="flex flex-row bg-white">{renderPage(block)}</div>
          )
        );
      });
  };

  const pages = [...pageIds, ...draftIds];

  return <div>{renderBlocks(pages)}</div>;
};

export default Pages;
