import { Link } from "react-router-dom";
import { formatId, formatTitle } from ".";
import { Page } from "../../blocks";
import PageIcon from "./PageIcon";

interface Props {
  page: Page;
  underline: boolean;
}

const PageLink = ({ page, underline }: Props) => {
  const path = formatId(page.id);
  const className = underline ? "underline" : "no-underline";

  return (
    <Link to={`/edit/${path}`} className="block truncate">
      <PageIcon page={page} />{" "}
      <span className={className}>
        {formatTitle(page.properties.title[0][0])}
      </span>
    </Link>
  );
};

export default PageLink;
