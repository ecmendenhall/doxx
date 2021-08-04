import { useState } from "react";
import { Page } from "../../blocks";
import EmojiPickerMenu from "./EmojiPickerMenu";
import { EmojiHero } from "./EmojiHero";

interface Props {
  page: Page;
  onSelect: (emoji: string) => void;
}

const EmojiPicker = ({ page, onSelect }: Props) => {
  const [pickerActive, setPickerActive] = useState(false);

  const onEmoji = (emoji: string) => {
    onSelect(emoji);
    setTimeout(() => setPickerActive(false), 5);
  };

  return (
    <div
      className="relative cursor-pointer rounded-sm hover:bg-gray-100"
      onClick={() => setPickerActive(true)}
    >
      <EmojiHero page={page} />
      <EmojiPickerMenu active={pickerActive} onSelect={onEmoji} />
    </div>
  );
};

export default EmojiPicker;
