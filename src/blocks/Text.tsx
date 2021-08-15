import { Text as TextBlock } from "../blocks";
import EditText from "../components/EditText";

import ReadOnlyEditor from "../components/ReadOnlyEditor";

interface Props {
  block: TextBlock;
  enabled: boolean;
}

const Text = ({ block, enabled }: Props) => {
  return (
    <div className="my-1 ml-2">
      {enabled ? <EditText block={block} /> : <ReadOnlyEditor block={block} />}
    </div>
  );
};

export default Text;
