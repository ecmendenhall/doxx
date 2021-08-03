import { Page, useRefCallback } from "../blocks";
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
    savePage,
    setActivePage,
  } = useApp();
  const [pickerActive, setPickerActive] = useState(false);

  const onSelect = (emoji: string) => {
    const updatedPage = { ...activePage, format: { page_icon: emoji } };
    setPickerActive(false);
    setActivePage(updatedPage);
    if (ceramic.status === "done" && idx.status === "done") {
      savePage(ceramic.ceramic, updatedPage);
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
    savePage,
    setActivePage,
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
      setActivePage(updatedPage);
    },
    [activePage]
  );

  const handleBlur = useRefCallback(() => {
    if (ceramic.status === "done" && idx.status === "done") {
      savePage(ceramic.ceramic, activePage);
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
    state: { activePage },
  } = useApp();

  if (activePage) {
    return (
      <div className="text-xl">
        <Emoji activePage={activePage} />
        <Title activePage={activePage} />
        <AddBlock />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PageHeader;
