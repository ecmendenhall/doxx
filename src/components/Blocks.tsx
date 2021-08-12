import { useCallback } from "react";
import { Block } from "../blocks";
import Heading from "../blocks/Heading";
import Page from "../blocks/Page";
import Text from "../blocks/Text";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";
import BlockMenu from "./ui/BlockMenu";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  enabled: boolean;
}

const BlocksContainer = {};

const Blocks = ({ enabled }: Props) => {
  const {
    state: {
      idx,
      ceramic,
      blocks: { blocks, drafts, deleting },
    },
    saveBlock,
    deleteBlock,
  } = useApp();
  const { page } = useActivePage();

  const handleDelete = useCallback(
    (block: Block) => {
      if (idx.status === "done" && ceramic.status === "done") {
        deleteBlock(idx.idx, ceramic.ceramic, block.id);
      }
    },
    [idx, ceramic]
  );

  const handleDragEnd = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newPageBlocks = Array.from(page.content);
      newPageBlocks.splice(source.index, 1);
      newPageBlocks.splice(destination.index, 0, draggableId);

      const newPage = {
        ...page,
        content: newPageBlocks,
      };
      if (ceramic.status === "done") {
        saveBlock(ceramic.ceramic, newPage);
      }
    },
    [page, ceramic]
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
      default:
        return <div></div>;
    }
  };

  const renderBlocks = (blockIds: string[]) => {
    return blockIds
      .filter((id: string) => !deleting.includes(id))
      .map((id: string, index: number) => {
        const block = blocks.get(id) || drafts.get(id);
        return (
          block && (
            <Draggable
              draggableId={block.id}
              index={index}
              isDragDisabled={!enabled}
            >
              {(provided) => {
                return (
                  <div
                    className="flex flex-row bg-white"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    {enabled && (
                      <div {...provided.dragHandleProps}>
                        <BlockMenu
                          block={block}
                          onDelete={() => {
                            handleDelete(block);
                          }}
                        />
                      </div>
                    )}
                    {renderBlock(block)}
                  </div>
                );
              }}
            </Draggable>
          )
        );
      });
  };

  const blocksAndDrafts = page ? [...page.content, ...page.drafts] : [];

  return (
    <div>
      {page && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={page.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {page && renderBlocks(blocksAndDrafts)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default Blocks;
