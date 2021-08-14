import { Page as PageBlock } from "../blocks";
import PageLink from "../components/ui/PageLink";

interface Props {
  block: PageBlock;
  enabled: boolean;
}

const Page = ({ block, enabled }: Props) => {
  return (
    <div className="my-1">
      <PageLink page={block} underline edit={enabled} spinner={false} />
    </div>
  );
};

export default Page;
