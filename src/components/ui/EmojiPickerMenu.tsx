import { Picker } from "emoji-mart";
import { BaseEmoji } from "emoji-mart";

interface EmojiPickerProps {
  active: boolean;
  onSelect: (emoji: string) => void;
  onBlur: () => void;
}

const EmojiPickerMenu = ({ active, onSelect, onBlur }: EmojiPickerProps) => {
  return (
    <div
      onBlur={onBlur}
      className={`absolute z-10 shadow-lg ${active ? "block" : "hidden"}`}
    >
      <Picker
        onSelect={(emoji: BaseEmoji) => {
          onSelect(emoji.native);
        }}
      />
    </div>
  );
};

export default EmojiPickerMenu;
