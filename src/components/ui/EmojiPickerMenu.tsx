import { Picker } from "emoji-mart";
import { BaseEmoji } from "emoji-mart";

interface EmojiPickerProps {
  active: boolean;
  onSelect: (emoji: string) => void;
}

const EmojiPickerMenu = ({ active, onSelect }: EmojiPickerProps) => {
  return (
    <div className={`absolute shadow-md ${active ? "block" : "hidden"}`}>
      <Picker
        onSelect={(emoji: BaseEmoji) => {
          onSelect(emoji.native);
        }}
      />
    </div>
  );
};

export default EmojiPickerMenu;
