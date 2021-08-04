import { Page } from "../../blocks";

interface Props {
  page: Page;
}

export const EmojiHero = ({ page }: Props) => {
  return <div className="text-8xl my-4 p-2">{page.format.page_icon}</div>;
};
