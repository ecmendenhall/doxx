import { Divider as DividerBlock } from "../blocks";

interface Props {
  block: DividerBlock;
  enabled: boolean;
}

const Divider = ({ block, enabled }: Props) => {
  return (
    <div className="my-2 flex-grow">
      <hr className="border-b-2 border-gray-200" />
    </div>
  );
};

export default Divider;
