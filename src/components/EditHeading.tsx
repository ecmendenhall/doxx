import { useRefCallback } from "../hooks/useRefCallback";
import useApp from "../hooks/useApp";
import ContentEditable from "react-contenteditable";
import Heading from "./ui/Heading";
import { Block } from "../blocks";

interface Props {
  block: Block;
}

const EditHeading = ({ block }: Props) => {
  const {
    state: { ceramic },
    setBlock,
    saveBlock,
  } = useApp();

  const handleChange = useRefCallback(
    (evt) => {
      const updatedBlock = {
        ...block,
        properties: {
          ...block.properties,
          title: [[evt.target.value.trim()]],
        },
      };
      setBlock(updatedBlock);
    },
    [block]
  );

  const handleBlur = useRefCallback(() => {
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, block);
    }
  }, [block]);

  return (
    <Heading>
      <ContentEditable
        className="p-2 outline-none"
        html={block.properties.title[0][0]}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Heading>
  );
};

export default EditHeading;
