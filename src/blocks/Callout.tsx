import { Callout as CalloutBlock } from "../blocks";
import EditCallout from "../components/EditCallout";

import ReadOnlyEditor from "../components/ReadOnlyEditor";
import { EmojiHero } from "../components/ui/EmojiHero";

interface Props {
  block: CalloutBlock;
  enabled: boolean;
}

const Text = ({ block, enabled }: Props) => {
  return (
    <div className="my-1 ml-2 flex-grow">
      {enabled ? (
        <EditCallout block={block} />
      ) : (
        <div className="flex flex-row px-4 rounded bg-gray-100">
          <div>
            <EmojiHero
              emoji={block.format.icon}
              size="2xl"
              hover={false}
              onClick={() => {}}
            />
          </div>
          <div className="flex-grow my-4 p-2">
            <ReadOnlyEditor block={block} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;
