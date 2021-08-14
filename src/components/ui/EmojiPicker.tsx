import { useState } from "react";
import EmojiPickerMenu from "./EmojiPickerMenu";
import { EmojiHero } from "./EmojiHero";

interface Props {
  emoji?: string;
  onSelect: (emoji: string) => void;
  size: string;
}

const EmojiPicker = ({ emoji, onSelect, size }: Props) => {
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
      <EmojiHero emoji={emoji} onClick={togglePicker} size={size} hover />
      <EmojiPickerMenu
        active={pickerActive}
        onBlur={onBlur}
        onSelect={onEmoji}
      />
    </div>
  );
};

export default EmojiPicker;
