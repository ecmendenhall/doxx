import { useRefCallback } from "../hooks/useRefCallback";
import useApp from "../hooks/useApp";
import ContentEditable from "react-contenteditable";
import Text from "./ui/Text";
import { Block } from "../blocks";
import { useEffect, useRef } from "react";

interface Props {
  block: Block;
}

const EditText = ({ block }: Props) => {
  const {
    state: {
      ceramic,
      blocks: { drafts },
      activeBlock,
    },
    setBlock,
    saveBlock,
    setActiveBlock,
  } = useApp();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (block.key === activeBlock) {
      console.log("refocusing");
      if (ref.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(ref.current);
        range.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        ref.current.focus();
      }
    }
  }, []);

  const handleChange = useRefCallback(
    (evt) => {
      console.log(block.saveState);
      const updatedBlock: Block = {
        ...block,
        properties: {
          ...block.properties,
          title: [[evt.target.value.trim()]],
        },
        saveState: "changed",
      };
      setBlock(updatedBlock);
    },
    [block]
  );

  const handleBlur = useRefCallback(() => {
    if (
      ceramic.status === "done" &&
      block.saveState === "changed" &&
      block.id.startsWith("ceramic://")
    ) {
      saveBlock(ceramic.ceramic, block);
    }
  }, [block]);

  const handleFocus = useRefCallback(() => {
    setActiveBlock(block.key);
  }, [block, setActiveBlock]);

  return (
    <Text>
      <ContentEditable
        innerRef={ref}
        className="p-2 outline-none"
        html={block.properties.title[0][0]}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={"Text"}
      />
    </Text>
  );
};

export default EditText;
