import { NFT as NFTBlock } from "../../blocks";
import { NFTE } from "@nfte/react";

interface Props {
  block: NFTBlock;
}

const DisplayEmbed = ({ block }: Props) => {
  const contract = block.properties.source[0][0];
  const tokenId = block.properties.id[0][0];

  return (
    <div className="flex-grow max-w-xl">
      <NFTE contract={contract} tokenId={tokenId} />
    </div>
  );
};

export default DisplayEmbed;
