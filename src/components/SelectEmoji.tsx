import { Page } from "../blocks";
import useApp from "../hooks/useApp";
import EmojiPicker from "./ui/EmojiPicker";

interface Props {
  page: Page;
}

const SelectEmoji = ({ page }: Props) => {
  const {
    state: { ceramic },
    setBlock,
    saveBlock,
  } = useApp();

  const onSelect = (emoji: string) => {
    if (ceramic.status === "done") {
      const updatedPage = { ...page, format: { page_icon: emoji } };
      setBlock(updatedPage);
      saveBlock(ceramic.ceramic, updatedPage);
    }
  };

  return (
    <EmojiPicker emoji={page.format.page_icon} size="8xl" onSelect={onSelect} />
  );
};

export default SelectEmoji;
