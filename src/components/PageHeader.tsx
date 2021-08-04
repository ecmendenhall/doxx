import { Page } from "../blocks";
import "emoji-mart/css/emoji-mart.css";
import AddBlock from "./AddBlock";
import SelectEmoji from "./SelectEmoji";
import useActivePage from "../hooks/useActivePage";
import EditPageTitle from "./EditPageTitle";

export interface Props {
  activePage: Page;
}

const PageHeader = () => {
  const { page } = useActivePage();

  return (
    <div>
      {page && (
        <div className="text-xl">
          <SelectEmoji page={page} />
          <EditPageTitle page={page} />
          <AddBlock />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
