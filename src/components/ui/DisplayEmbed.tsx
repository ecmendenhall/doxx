import Embed from "react-embed";

interface Props {
  url: string;
}

const DisplayEmbed = ({ url }: Props) => {
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
    <div className="flex-grow max-w-xl">
      {validUrl(url) ? <Embed url={url} /> : "Doxx can't embed this URL."}
    </div>
  );
};
export default DisplayEmbed;
