import { ReactTinyLink } from "react-tiny-link";

interface Props {
  url: string;
}

const BookmarkEmbed = ({ url }: Props) => {
  const validUrl = (url: string) => {
    try {
      new URL(url);
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  };

  return (
    <div>
      {validUrl(url) ? (
        <ReactTinyLink
          proxyUrl="https://doxx-proxy.herokuapp.com"
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          url={url}
        />
      ) : (
        "Doxx can't embed this URL."
      )}
    </div>
  );
};
export default BookmarkEmbed;
