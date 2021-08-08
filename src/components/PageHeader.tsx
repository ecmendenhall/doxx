import "emoji-mart/css/emoji-mart.css";
import SelectEmoji from "./SelectEmoji";
import useActivePage from "../hooks/useActivePage";
import EditPageTitle from "./EditPageTitle";
import { EmojiHero } from "./ui/EmojiHero";
import PageTitle from "./ui/PageTitle";

export interface Props {
  enabled: boolean;
}

const PageHeader = ({ enabled }: Props) => {
  const { page } = useActivePage();

  if (enabled) {
    return (
      <div>
        {page && (
          <div className="text-xl">
            <SelectEmoji page={page} />
            <EditPageTitle page={page} />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {page && (
          <div className="text-xl">
            <EmojiHero page={page} hover={false} />
            <PageTitle>
              <h1 className="p2">{page.properties.title[0][0]}</h1>
            </PageTitle>
          </div>
        )}
      </div>
    );
  }
};

export default PageHeader;
