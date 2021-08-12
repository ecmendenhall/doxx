import { Page } from "../../blocks";
import PageLink from "./PageLink";

interface Props {
  page: Page;
  active: boolean;
}

const ACTIVE = "hover:bg-purple-400 bg-purple-300";
const INACTIVE = "hover:bg-purple-300";

const PageListItem = ({ page, active }: Props) => {
  const className = `${active ? ACTIVE : INACTIVE} py-1 px-4`;

  return (
    <li className={className}>
      <PageLink page={page} underline={false} spinner />
    </li>
  );
};

export default PageListItem;
