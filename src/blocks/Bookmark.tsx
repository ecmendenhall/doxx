import { Bookmark as BookmarkBlock } from "../blocks";
import SelectBookmark from "../components/SelectBookmark";
import BookmarkEmbed from "../components/ui/BookmarkEmbed";

interface Props {
  block: BookmarkBlock;
  enabled: boolean;
}

const Bookmark = ({ block, enabled }: Props) => {
  const url = block.properties.source[0][0];

  return (
    <div className="my-2">
      {enabled ? <SelectBookmark block={block} /> : <BookmarkEmbed url={url} />}
    </div>
  );
};

export default Bookmark;
