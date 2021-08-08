import Editor from "@draft-js-plugins/editor";
import createMarkdownShortcutsPlugin from "draft-js-markdown-shortcuts-plugin";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import { EditorState } from "draft-js";
import { useState } from "react";
import createPrismPlugin from "draft-js-prism-plugin";
import Prism from "prismjs";

import "draft-js/dist/Draft.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "prismjs/themes/prism.css";

const prismPlugin = createPrismPlugin({
  prism: Prism,
});
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions } = emojiPlugin;
const plugins = [
  prismPlugin,
  createMarkdownShortcutsPlugin(),
  emojiPlugin,
  createLinkifyPlugin(),
];

const MarkdownEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Editor editorState={editorState} onChange={onChange} plugins={plugins} />
      <EmojiSuggestions />
    </div>
  );
};

export default MarkdownEditor;
