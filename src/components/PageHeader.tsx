import { Page } from "../blocks";
import { useRefCallback } from "../hooks/useRefCallback";
import useApp from "../hooks/useApp";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useState } from "react";
import type { BaseEmoji } from "emoji-mart";
import ContentEditable from "react-contenteditable";
import AddBlock from "./AddBlock";

interface Props {
  activePage: Page;
}

interface EmojiPickerProps {
  active: boolean;
  onSelect: (emoji: string) => void;
}

const EmojiPicker = ({ active, onSelect }: EmojiPickerProps) => {
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

const Emoji = ({ activePage }: Props) => {
  const {
    state: { ceramic, idx },
    setBlock,
    saveBlock,
  } = useApp();
  const [pickerActive, setPickerActive] = useState(false);

  const onSelect = (emoji: string) => {
    const updatedPage = { ...activePage, format: { page_icon: emoji } };
    setPickerActive(false);
    setBlock(updatedPage);
    if (ceramic.status === "done" && idx.status === "done") {
      saveBlock(ceramic.ceramic, updatedPage);
    }
  };

  return (
    <div className="relative">
      <div
        className="text-8xl my-4 cursor-pointer"
        onClick={() => setPickerActive(true)}
      >
        <span className="p-2 rounded-sm hover:bg-gray-100">
          {activePage.format.page_icon}
        </span>
      </div>
      <EmojiPicker active={pickerActive} onSelect={onSelect} />
    </div>
  );
};

const Title = ({ activePage }: Props) => {
  const {
    state: { ceramic, idx },
    setBlock,
    saveBlock,
  } = useApp();

  const handleChange = useRefCallback(
    (evt) => {
      const updatedPage = {
        ...activePage,
        properties: {
          ...activePage.properties,
          title: [[evt.target.value.trim()]],
        },
      };
      setBlock(updatedPage);
    },
    [activePage]
  );

  const handleBlur = useRefCallback(() => {
    if (ceramic.status === "done" && idx.status === "done") {
      saveBlock(ceramic.ceramic, activePage);
    }
  }, [activePage]);

  return (
    <h1 className="font-bold text-4xl my-4">
      <ContentEditable
        className="p-2 outline-none"
        html={activePage.properties.title[0][0]}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </h1>
  );
};

const PageHeader = () => {
  const {
    state: {
      activePage,
      blocks: { blocks, drafts },
    },
  } = useApp();

  if (activePage) {
    const page = blocks.get(activePage) || drafts.get(activePage);
    if (page) {
      return (
        <div className="text-xl">
          <Emoji activePage={page} />
          <Title activePage={page} />
          <AddBlock />
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};

export default PageHeader;
