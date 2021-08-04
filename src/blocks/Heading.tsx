import { Block } from "../blocks";
import EditHeading from "../components/EditHeading";

interface Props {
  block: Block;
}

const Heading = ({ block }: Props) => {
  return (
    <div className="my-2">
      <EditHeading block={block} />
    </div>
  );
};

export default Heading;
