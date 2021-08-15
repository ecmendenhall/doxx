import { useState } from "react";
import { Image as ImageBlock } from "../blocks";
import useApp from "../hooks/useApp";
import storage from "../lib/storage";
import ImageInput, { Dimensions } from "./ui/ImageInput";
import { v4 as uuid } from "uuid";

interface Props {
  block: ImageBlock;
}

const SelectImage = ({ block }: Props) => {
  const {
    state: { ceramic },
    setBlock,
    saveBlock,
  } = useApp();
  const [image, setImage] = useState({});

  const onImageChange = async (name: string, file: File) => {
    setImage({
      [name]: file,
    });
    const cid = await storage.storeFiles([file]);
    const newBlock = {
      ...block,
      properties: {
        ...block.properties,
        source: [[`ipfs://${cid}/${file.name}`]],
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
    }
  };

  const onResize = (dimensions: Dimensions) => {
    const { height, width } = dimensions;
    const newBlock = {
      ...block,
      format: {
        width: width,
        height: height,
      },
    };
    setBlock(newBlock);
  };

  const onResizeStop = (dimensions: Dimensions) => {
    const { height, width } = dimensions;
    const newBlock = {
      ...block,
      format: {
        width: width,
        height: height,
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
    }
  };

  const empty = !block.properties.source[0][0];

  return (
    <div
      className="relative"
      style={{ width: block.format.width, height: block.format.height }}
    >
      <ImageInput
        resizable
        width={block.format.width}
        src={
          storage.gatewayUrl(block.properties.source[0][0]) ||
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        }
        text="Choose Image"
        name={`image-${uuid()}`}
        alt="image block"
        onChange={onImageChange}
        imgClassName={`w-full object-fill object-center`}
        onResize={onResize}
        onResizeStop={onResizeStop}
      />
    </div>
  );
};

export default SelectImage;
