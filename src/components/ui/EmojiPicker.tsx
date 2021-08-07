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

  const onBlur = () => {
    setPickerActive(false);
  };

  const togglePicker = () => {
    setPickerActive(!pickerActive);
  };

  const onEmoji = (emoji: string) => {
    onSelect(emoji);
    setTimeout(() => setPickerActive(false), 5);
  };

  return (
    <div className="relative">
      <EmojiHero page={page} onClick={togglePicker} hover />
      <EmojiPickerMenu
        active={pickerActive}
        onBlur={onBlur}
        onSelect={onEmoji}
      />
    </div>
  );
};

export default EmojiPicker;
