import { Page } from "../../blocks";

interface Props {
  page: Page;
}

const PageIcon = ({ page }: Props) => {
  if (page.saveState === "saving") {
    return (
      <span className="text-xl mx-1">
        <svg
          className="animate-spin h-4 w-4 text-purple-500 inline"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </span>
    );
  } else {
    return <span className="text-xl ml-1">{page.format.page_icon}</span>;
  }
};

export default PageIcon;
