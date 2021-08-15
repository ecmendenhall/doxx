import { File as FileBlock } from "../blocks";
import SelectFile from "../components/SelectFile";
import DisplayFile from "../components/ui/DisplayFile";

interface Props {
  block: FileBlock;
  enabled: boolean;
}

const Image = ({ block, enabled }: Props) => {
  return (
    <div className="my-4">
      {enabled ? <SelectFile block={block} /> : <DisplayFile block={block} />}
    </div>
  );
};

export default Image;
