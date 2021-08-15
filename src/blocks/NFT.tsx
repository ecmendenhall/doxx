import { NFT as NFTBlock } from "../blocks";
import SelectNFT from "../components/SelectNFT";
import DisplayNFT from "../components/ui/DisplayNFT";

interface Props {
  block: NFTBlock;
  enabled: boolean;
}

const NFT = ({ block, enabled }: Props) => {
  return (
    <div className="my-2 lg:w-2/3 w-full">
      {enabled ? <SelectNFT block={block} /> : <DisplayNFT block={block} />}
    </div>
  );
};

export default NFT;
