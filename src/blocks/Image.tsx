import { Image as ImageBlock } from "../blocks";
import SelectImage from "../components/SelectImage";
import storage from "../lib/storage";

interface Props {
  block: ImageBlock;
  enabled: boolean;
}

const Image = ({ block, enabled }: Props) => {
  return (
    <div className="my-4">
      {enabled ? (
        <SelectImage block={block} />
      ) : (
        <img
          src={storage.gatewayUrl(block.properties.source[0][0])}
          width={block.format.width}
          height={block.format.height}
        />
      )}
    </div>
  );
};

export default Image;
