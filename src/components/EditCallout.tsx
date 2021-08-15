import EditText from "./EditText";
import { Callout as CalloutBlock } from "../blocks";
import useApp from "../hooks/useApp";
import EmojiPicker from "./ui/EmojiPicker";

interface Props {
  block: CalloutBlock;
}

const EditCallout = ({ block }: Props) => {
  const {
    state: { ceramic },
    saveBlock,
  } = useApp();

  const onEmojiSelect = (emoji: string) => {
    const newBlock = {
      ...block,
      format: {
        icon: emoji,
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
    }
  };

  return (
    <div className="flex flex-row px-4 rounded bg-gray-100">
      <div>
        <EmojiPicker
          emoji={block.format.icon}
          onSelect={onEmojiSelect}
          size="2xl"
        />
      </div>
      <div className="flex-grow my-4 p-2">
        <EditText block={block} />
      </div>
    </div>
  );
};

export default EditCallout;
