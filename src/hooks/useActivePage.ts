import useApp from "./useApp";

const useActivePage = () => {
  const {
    state: {
      blocks: { blocks, drafts },
      activePage,
    },
  } = useApp();

  const page = blocks.get(activePage) || drafts.get(activePage);
  return { page };
};

export default useActivePage;
