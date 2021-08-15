import { NFT as NFTBlock } from "../blocks";
import { useState } from "react";
import useApp from "../hooks/useApp";
import DisplayNFT from "./ui/DisplayNFT";

interface Props {
  block: NFTBlock;
}

const SelectNFT = ({ block }: Props) => {
  const {
    state: { ceramic },
    saveBlock,
  } = useApp();
  const [saved, setSaved] = useState(
    !!block.properties.source[0][0] && !!block.properties.id[0][0]
  );
  const [edit, setEdit] = useState(
    !block.properties.source[0][0] || !block.properties.id[0][0]
  );
  const [source, setSource] = useState(block.properties.source[0][0] || "");
  const [id, setId] = useState(block.properties.id[0][0] || "");

  const onSourceChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSource(evt.target.value);
  };

  const onIdChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setId(evt.target.value);
  };

  const onEdit = () => {
    setEdit(true);
  };

  const onSubmit = () => {
    const newBlock = {
      ...block,
      properties: {
        ...block.properties,
        source: [[source]],
        id: [[id]],
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
      setSaved(true);
      setEdit(false);
    }
  };

  return (
    <div className="my-4 p-4 rounded bg-gray-100">
      <div className="flex flex-row items-center">
        <span className="text-2xl mr-4">🎨</span>
        <div className="flex flex-row flex-grow gap-x-1">
          <input
            className="font-mono flex-grow max-w-72 px-2 py-1 mr-4 border border-gray-300 rounded p-4 focus:border-purple-600 focus:outline-none"
            type="text"
            name="source"
            placeholder="Contract address"
            value={source}
            autoComplete="off"
            onChange={onSourceChange}
            disabled={!edit || block.saveState !== "saved"}
          />
          <input
            className="w-24 px-2 py-1 mr-4 border border-gray-300 rounded p-4 focus:border-purple-600 focus:outline-none"
            type="text"
            name="id"
            placeholder="Token ID"
            value={id}
            autoComplete="off"
            onChange={onIdChange}
            disabled={!edit || block.saveState !== "saved"}
          />
          <button
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-lg shadow-sm"
            onClick={edit ? onSubmit : onEdit}
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-center content-center">
        {saved && <DisplayNFT block={block} />}
      </div>
    </div>
  );
};

export default SelectNFT;
