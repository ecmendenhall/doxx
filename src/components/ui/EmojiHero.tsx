import { Page } from "../../blocks";

interface Props {
  page: Page;
  hover: boolean;
  onClick?: () => void;
}

export const EmojiHero = ({ page, hover, onClick }: Props) => {
  const className = hover ? "cursor-pointer rounded-lg hover:bg-gray-100" : "";

  return (
    <div onClick={onClick} className="text-8xl my-4 p-2">
      <span className={className}>{page.format.page_icon}</span>
    </div>
  );
};
