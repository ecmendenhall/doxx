import { Page } from "../blocks";
import useApp from "../hooks/useApp";
import PageListItem from "./ui/PageListItem";

const PagesList = () => {
  const {
    state: {
      blocks: { blocks, drafts },
      pages: { pageIds, draftIds },
      activePage,
    },
  } = useApp();

  const isPage = (item: Page | undefined): item is Page => {
    return !!item;
  };

  const getPage = (id: string) => {
    return blocks.get(id) || drafts.get(id);
  };

  const pageBlocks = [...pageIds, ...draftIds].map(getPage).filter(isPage);

  return (
    <ul>
      {pageBlocks.map((page) => (
        <PageListItem page={page} active={activePage === page.id} />
      ))}
    </ul>
  );
};

export default PagesList;
