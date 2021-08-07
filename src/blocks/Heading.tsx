import { Heading as HeadingBlock } from "../blocks";
import EditHeading from "../components/EditHeading";

interface Props {
  block: HeadingBlock;
}

const Heading = ({ block }: Props) => {
  return (
    <div className="my-2">
      <EditHeading block={block} />
    </div>
  );
};

export default Heading;
