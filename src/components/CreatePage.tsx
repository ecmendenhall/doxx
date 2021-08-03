import { Page } from "../blocks";
import useApp from "../hooks/useApp";
import { v4 as uuid } from "uuid";

const createEmptyPage = (): Page => {
  return {
    id: uuid(),
    saveState: "new",
    type: "page",
    properties: {
      title: [["New Page"]],
    },
    content: [],
    format: {
      page_icon: "📑",
    },
    parent: "",
  };
};

const CreatePage = () => {
  const {
    state: { idx, ceramic },
    saveNewPage,
  } = useApp();

  return (
    <button
      onClick={async () => {
        if (idx.status === "done" && ceramic.status === "done") {
          const page = createEmptyPage();
          saveNewPage(idx.idx, ceramic.ceramic, page);
        }
      }}
      className="absolute bottom-0 left-0 w-full p-2 text-left hover:bg-purple-300 border-purple-200 border-t-2"
    >
      <span className="text-xl">+</span> New page
    </button>
  );
};

export default CreatePage;
