import { Page, SaveState } from "../blocks";
import useApp from "../hooks/useApp";

const PagesList = () => {
  const {
    state: {
      pages: { status, pages },
      activePage,
    },
    setActivePage,
  } = useApp();

  const convert = (html: string) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return (divContainer.textContent || "").replaceAll(/\n/g, " ");
  };

  const pageIcon = (page: Page) => {
    if (page.saveState === "saving") {
      return (
        <span>
          <svg
            className="animate-spin mx-1 h-4 w-4 text-purple-500 inline"
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
      return <span className="text-l mx-1">{page.format.page_icon}</span>;
    }
  };

  return (
    <ul>
      {status === "done"
        ? Array.from(pages).map(([id, page]) => {
            return (
              <li
                onClick={() => setActivePage(page)}
                className={`${
                  activePage && activePage.id === id
                    ? "hover:bg-purple-400 bg-purple-300"
                    : "hover:bg-purple-300"
                } py-1 px-4 cursor-pointer truncate`}
              >
                {pageIcon(page)} {convert(page.properties.title[0][0])}
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default PagesList;
