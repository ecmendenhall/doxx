import { Embed as EmbedBlock } from "../blocks";
import SelectEmbed from "../components/SelectEmbed";
import DisplayEmbed from "../components/ui/DisplayEmbed";

interface Props {
  block: EmbedBlock;
  enabled: boolean;
}

const Embed = ({ block, enabled }: Props) => {
  const url = block.properties.source[0][0];

  return (
    <div className="my-2 lg:w-2/3 w-full">
      {enabled ? <SelectEmbed block={block} /> : <DisplayEmbed url={url} />}
    </div>
  );
};

export default Embed;
