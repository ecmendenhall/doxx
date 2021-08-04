import { Block } from "../blocks";
import EditText from "../components/EditText";

interface Props {
  block: Block;
}

const Text = ({ block }: Props) => {
  return (
    <div className="my-1">
      <EditText block={block} />
    </div>
  );
};

export default Text;
