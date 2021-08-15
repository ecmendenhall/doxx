import { File as FileBlock } from "../../blocks";
import storage from "../../lib/storage";
import prettyBytes from "pretty-bytes";
import React from "react";

interface Props {
  block: FileBlock;
  children?: React.ReactNode;
}

const DisplayFile = ({ block, children }: Props) => {
  const title = block.properties.title[0][0];
  const source = block.properties.source[0][0];
  const size = block.properties.size[0][0];

  return (
    <div className="flex flex-row items-center p-4 rounded bg-gray-100">
      <span className="text-2xl mr-4">📎</span>
      {source && (
        <a
          className="underline text-xl mr-4"
          target="_blank"
          rel="noreferrer"
          href={storage.gatewayUrl(source)}
        >
          {title}
        </a>
      )}
      {size && (
        <span className="uppercase text-sm text-gray-600 mr-4">
          {prettyBytes(size)}
        </span>
      )}
      {children}
    </div>
  );
};

export default DisplayFile;
