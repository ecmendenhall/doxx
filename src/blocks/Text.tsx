import { convertFromRaw, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import { Block, Text as TextBlock } from "../blocks";
import EditText, { createPlugins } from "../components/EditText";
import DisplayText from "../components/ui/Text";

import "draft-js/dist/Draft.css";
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/linkify/lib/plugin.css";
import "prismjs/themes/prism.css";
import { useState } from "react";

interface Props {
  block: TextBlock;
  enabled: boolean;
}

interface ReadOnlyEditorProps {
  block: TextBlock;
}

const { plugins } = createPlugins();

const getInitialState = ({ properties }: TextBlock) => {
  const content = properties.title[0][0];
  if (content === "") {
    return EditorState.createEmpty();
  } else {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  }
};

const ReadOnlyEditor = ({ block }: ReadOnlyEditorProps) => {
  const [editorState, setEditorState] = useState(getInitialState(block));

  return (
    <DisplayText>
      <Editor
        readOnly
        onChange={(editorState: EditorState) => {
          setEditorState(editorState);
        }}
        plugins={plugins}
        editorState={editorState}
      />
    </DisplayText>
  );
};

const Text = ({ block, enabled }: Props) => {
  return (
    <div className="my-1 ml-2">
      {enabled ? <EditText block={block} /> : <ReadOnlyEditor block={block} />}
    </div>
  );
};

export default Text;
