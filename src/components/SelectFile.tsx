import { File as FileBlock } from "../blocks";
import useApp from "../hooks/useApp";
import storage from "../lib/storage";
import { v4 as uuid } from "uuid";
import FileInput from "./ui/FileInput";
import DisplayFile from "./ui/DisplayFile";

interface Props {
  block: FileBlock;
}

const SelectFile = ({ block }: Props) => {
  const {
    state: { ceramic },
    saveBlock,
  } = useApp();

  const onFileChange = async (name: string, file: File) => {
    const cid = await storage.storeFiles([file]);
    const newBlock = {
      ...block,
      properties: {
        ...block.properties,
        title: [[file.name]],
        size: [[file.size]],
        type: [[file.type]],
        source: [[`ipfs://${cid}/${file.name}`]],
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
    }
  };

  return (
    <DisplayFile block={block}>
      <FileInput
        labelClassName="cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-lg shadow-sm"
        src={storage.gatewayUrl(block.properties.source[0][0]) || ""}
        text={block.properties.source[0][0] ? "Change File" : "Select File"}
        name={`file-${uuid()}`}
        onChange={onFileChange}
      />
    </DisplayFile>
  );
};

export default SelectFile;
