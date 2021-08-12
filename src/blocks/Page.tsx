import { Page as PageBlock } from "../blocks";
import PageLink from "../components/ui/PageLink";

interface Props {
  block: PageBlock;
  enabled: boolean;
}

const Page = ({ block }: Props) => {
  return (
    <div className="my-1">
      <PageLink page={block} underline spinner={false} />
    </div>
  );
};

export default Page;
