import { Page } from "../blocks";
import useApp from "./useApp";

const useActivePage = () => {
  const {
    state: {
      blocks: { blocks, drafts },
      activePage,
    },
  } = useApp();

  const page = (blocks.get(activePage) || drafts.get(activePage)) as Page;
  return { page };
};

export default useActivePage;
