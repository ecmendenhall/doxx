import React, { useState } from "react";
import { Image as ImageBlock } from "../blocks";
import useApp from "../hooks/useApp";
import storage from "../lib/storage";
import ImageInput from "./ui/ImageInput";
import { v4 as uuid } from "uuid";
import { Block } from "@ethersproject/providers";

interface Props {
  block: ImageBlock;
}

const SelectImage = ({ block }: Props) => {
  const {
    state: { ceramic },
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
        source: [[`ipfs://${cid}/${file.name}`]],
      },
    };
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, newBlock);
    }
  };

  const empty = !block.properties.source[0][0];
  const width = empty ? "w-96 h-60" : `w-auto`;

  return (
    <div
      style={{ width: block.format.width }}
      className={`${width} bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50`}
    >
      <ImageInput
        src={
          storage.gatewayUrl(block.properties.source[0][0]) ||
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        }
        text="Choose Image"
        name={`image-${uuid()}`}
        alt="image block"
        onChange={onImageChange}
        imgClassName={`${width} object-cover object-center`}
      />
    </div>
  );
};

export default SelectImage;
