import AddBlock from "./AddBlock";
import Blocks from "./Blocks";
import PageHeader from "./PageHeader";

interface Props {
  enabled: boolean;
}

const Editor = ({ enabled }: Props) => {
  return (
    <div>
      <PageHeader enabled={enabled} />
      <Blocks enabled={enabled} />
      {enabled && <AddBlock />}
    </div>
  );
};

export default Editor;
