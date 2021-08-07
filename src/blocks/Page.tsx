import { Page as PageBlock } from "../blocks";
import PageLink from "../components/ui/PageLink";

interface Props {
  block: PageBlock;
}

const Page = ({ block }: Props) => {
  return (
    <div className="my-1">
      <PageLink page={block} underline />
    </div>
  );
};

export default Page;
