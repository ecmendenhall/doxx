import { Image as ImageBlock } from "../blocks";
import SelectImage from "../components/SelectImage";

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
        <img src={block.properties.source[0][0]} />
      )}
    </div>
  );
};

export default Image;
