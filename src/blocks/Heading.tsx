import { Heading as HeadingBlock } from "../blocks";
import EditHeading from "../components/EditHeading";
import DisplayHeading from "../components/ui/Heading";

interface Props {
  block: HeadingBlock;
  enabled: boolean;
}

const Heading = ({ block, enabled }: Props) => {
  return (
    <div className="my-2">
      {enabled ? (
        <EditHeading block={block} />
      ) : (
        <DisplayHeading type={block.type}>
          <div className="p-2">{block.properties.title[0][0]}</div>
        </DisplayHeading>
      )}
    </div>
  );
};

export default Heading;
