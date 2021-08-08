import useApp from "../hooks/useApp";
import Text from "./ui/Text";
import { Block, Text as TextBlock } from "../blocks";
import { useRef } from "react";

import Editor from "@draft-js-plugins/editor";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import createPrismPlugin from "draft-js-prism-plugin";
import Prism from "prismjs";

import "draft-js/dist/Draft.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "prismjs/themes/prism.css";
import PluginEditor from "@draft-js-plugins/editor";
import { useCallback } from "react";
import SaveSpinner from "./ui/SaveSpinner";

interface Props {
  block: Block;
}

export const createPlugins = () => {
  const prismPlugin = createPrismPlugin({
    prism: Prism,
  });
  const emojiPlugin = createEmojiPlugin({
    useNativeArt: true,
  });
  const { EmojiSuggestions } = emojiPlugin;
  const plugins = [
    createMarkdownShortcutsPlugin(),
    emojiPlugin,
    createLinkifyPlugin(),
    prismPlugin,
  ];
  return { plugins, EmojiSuggestions };
};

const getInitialState = (
  editorStates: Map<string, EditorState>,
  { key, properties }: TextBlock
) => {
  const editorState = editorStates.get(key);
  if (editorState) {
    return editorState;
    //return EditorState.moveFocusToEnd(editorState);
  } else {
    const content = properties.title[0][0];
    if (content === "") {
      return EditorState.createEmpty();
    } else {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    }
  }
};

const EditText = ({ block }: Props) => {
  const {
    state: { ceramic, editorStates },
    setBlock,
    saveBlock,
    setActiveBlock,
    setEditorState,
  } = useApp();
  const [editorState, setEditorState2] = useState(
    getInitialState(editorStates, block as TextBlock)
  );
  const [{ plugins, EmojiSuggestions }] = useState(createPlugins());
  const ref = useRef<PluginEditor>(null);

  const handleChange = useCallback(
    (newEditorState: EditorState) => {
      if (newEditorState !== editorState) {
        setEditorState(block.key, newEditorState);
        setEditorState2(newEditorState);
        if (
          newEditorState.getCurrentContent() !== editorState.getCurrentContent()
        ) {
          const updatedBlock: Block = {
            ...block,
            type: "text",
            properties: {
              ...block.properties,
              title: [
                [
                  JSON.stringify(
                    convertToRaw(newEditorState.getCurrentContent())
                  ),
                ],
              ],
            },
            saveState: "changed",
          };
          setBlock(updatedBlock);
        }
      }
    },

    [block, editorState, setEditorState, setBlock]
  );

  const handleBlur = useCallback(() => {
    if (
      ceramic.status === "done" &&
      block.saveState === "changed" &&
      block.id.startsWith("ceramic://")
    ) {
      saveBlock(ceramic.ceramic, block);
    }
  }, [ceramic, block, saveBlock]);

  const handleFocus = useCallback(() => {
    setActiveBlock(block.key);
  }, [block, setActiveBlock]);

  const handleClick = useCallback(() => {
    ref && ref.current?.focus();
  }, [ref]);

  return (
    <Text>
      <div className="flex flex-row" onClick={handleClick}>
        <SaveSpinner block={block} />
        <div className="ml-2">
          <Editor
            ref={ref}
            placeholder={"Text"}
            editorState={editorState}
            plugins={plugins}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <EmojiSuggestions />
        </div>
      </div>
    </Text>
  );
};

export default EditText;
