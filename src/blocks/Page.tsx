import { Block } from "../blocks";
import PageLink from "../components/ui/PageLink";

interface Props {
  block: Block;
}

const Page = ({ block }: Props) => {
  return (
    <div className="my-1">
      <PageLink page={block} underline />
    </div>
  );
};

export default Page;
