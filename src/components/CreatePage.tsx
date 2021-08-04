import { createEmptyPage } from "../blocks";
import useApp from "../hooks/useApp";

const CreatePage = () => {
  const {
    state: { idx, ceramic },
    saveNewPage,
  } = useApp();

  const onClick = () => {
    if (idx.status === "done" && ceramic.status === "done") {
      const page = createEmptyPage();
      saveNewPage(idx.idx, ceramic.ceramic, page);
    }
  };

  return (
    <button
      onClick={onClick}
      className="absolute bottom-0 left-0 w-full p-2 text-left hover:bg-purple-300 border-purple-200 border-t-2"
    >
      <span className="text-xl">+</span> New page
    </button>
  );
};

export default CreatePage;
