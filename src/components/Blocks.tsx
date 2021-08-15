import { useCallback } from "react";
import { Block } from "../blocks";
import Heading from "../blocks/Heading";
import Page from "../blocks/Page";
import Text from "../blocks/Text";
import Image from "../blocks/Image";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";
import BlockMenu from "./ui/BlockMenu";
import Callout from "../blocks/Callout";
import Divider from "../blocks/Divider";
import File from "../blocks/File";
import Bookmark from "../blocks/Bookmark";
import Embed from "../blocks/Embed";
import NFT from "../blocks/NFT";

interface Props {
  enabled: boolean;
}

const Blocks = ({ enabled }: Props) => {
  const {
    state: {
      idx,
      ceramic,
      blocks: { blocks, drafts, deleting },
    },
    deleteBlock,
  } = useApp();
  const { page } = useActivePage();

  const handleDelete = useCallback(
    (block: Block) => {
      if (idx.status === "done" && ceramic.status === "done") {
        deleteBlock(idx.idx, ceramic.ceramic, block.id);
      }
    },
    [idx, ceramic, deleteBlock]
  );

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "page":
        return <Page block={block} key={block.key} enabled={enabled} />;
      case "text":
        return <Text block={block} key={block.key} enabled={enabled} />;
      case "heading-1":
        return <Heading block={block} key={block.key} enabled={enabled} />;
      case "heading-2":
        return <Heading block={block} key={block.key} enabled={enabled} />;
      case "heading-3":
        return <Heading block={block} key={block.key} enabled={enabled} />;
      case "image":
        return <Image block={block} key={block.key} enabled={enabled} />;
      case "file":
        return <File block={block} key={block.key} enabled={enabled} />;
      case "callout":
        return <Callout block={block} key={block.key} enabled={enabled} />;
      case "divider":
        return <Divider block={block} key={block.key} enabled={enabled} />;
      case "bookmark":
        return <Bookmark block={block} key={block.key} enabled={enabled} />;
      case "embed":
        return <Embed block={block} key={block.key} enabled={enabled} />;
      case "nft":
        return <NFT block={block} key={block.key} enabled={enabled} />;
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
            <div className="flex flex-row bg-white">
              {enabled && (
                <BlockMenu
                  block={block}
                  onDelete={() => {
                    handleDelete(block);
                  }}
                />
              )}
              {renderBlock(block)}
            </div>
          )
        );
      });
  };

  const blocksAndDrafts = page ? [...page.content, ...page.drafts] : [];

  return <div> {page && renderBlocks(blocksAndDrafts)}</div>;
};

export default Blocks;
