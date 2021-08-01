import useApp from "../hooks/useApp";

const PagesList = () => {
  const {
    state: {
      pages: { status, pages },
    },
    setActivePage,
  } = useApp();

  return (
    <ul>
      {status === "done"
        ? Array.from(pages).map(([id, page]) => {
            return (
              <li
                onClick={() => setActivePage(page)}
                className="hover:bg-purple-300 py-1 px-4 cursor-pointer truncate"
              >
                <span className="text-l mx-1">{page.format.page_icon}</span>{" "}
                {page.properties.title}
              </li>
            );
          })
        : ""}
    </ul>
  );
};

export default PagesList;
