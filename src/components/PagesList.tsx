import { useState } from "react";
import { Block, Page } from "../blocks";
import useApp from "../hooks/useApp";
import PageListItem from "./ui/PageListItem";

interface Props {
  content: string[];
  level: number;
  edit: boolean;
}

interface SubListProps {
  page: Block;
  level: number;
  activePage: string;
  subPages: string[];
  edit: boolean;
}

const SubList = ({ page, level, activePage, subPages, edit }: SubListProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <PageListItem
        page={page as Page}
        key={page.id}
        active={activePage === page.id}
        level={level}
        showToggle={subPages.length > 0}
        toggled={open}
        onToggle={toggleOpen}
        edit={edit}
      />
      {subPages && (
        <div className={open ? "block" : "hidden"}>
          <PagesList content={subPages} level={level + 1} edit={edit} />
        </div>
      )}
    </div>
  );
};

const PagesList = ({ content, level, edit }: Props) => {
  const {
    state: {
      blocks: { blocks, drafts },
      activePage,
    },
  } = useApp();

  const isPage = (item: Block | undefined): item is Block => {
    return !!item && item.type === "page";
  };

  const getPage = (id: string) => {
    return blocks.get(id) || drafts.get(id);
  };

  const subPages = (content: string[]) => {
    return content
      .map(getPage)
      .filter(isPage)
      .map((p) => p.id);
  };

  const pageBlocks = content.map(getPage).filter(isPage);

  return (
    <ul>
      {pageBlocks.map((page) => (
        <SubList
          page={page}
          level={level}
          activePage={activePage}
          subPages={subPages(page.content)}
          key={page.key}
          edit={edit}
        />
      ))}
    </ul>
  );
};

export default PagesList;
