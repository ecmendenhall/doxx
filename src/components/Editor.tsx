import AddBlock from "./AddBlock";
import Blocks from "./Blocks";
import PageHeader from "./PageHeader";

const Editor = () => {
  return (
    <div>
      <PageHeader />
      <Blocks />
      <AddBlock />
    </div>
  );
};

export default Editor;
