import { Page } from "../../blocks";
import PageLink from "./PageLink";

interface Props {
  page: Page;
  active: boolean;
  level: number;
  showToggle: boolean;
  toggled: boolean;
  onToggle: () => void;
  edit: boolean;
}

const ACTIVE = "hover:bg-purple-400 bg-purple-300";
const INACTIVE = "hover:bg-purple-300";

const PageListItem = ({
  page,
  active,
  level,
  showToggle,
  toggled,
  onToggle,
  edit,
}: Props) => {
  const activeClassName = `${active ? ACTIVE : INACTIVE}`;
  const className = `py-1 pr-4 pl-${
    4 + level * 4
  } flex flex-row justify-between`;

  return (
    <li className={activeClassName}>
      <div className={className}>
        <div className="flex-grow truncate overflow-ellipsis">
          <PageLink page={page} underline={false} edit={edit} spinner />
        </div>
        {showToggle && (
          <span onClick={onToggle} className="cursor-pointer">
            {toggled ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        )}
      </div>
    </li>
  );
};

export default PageListItem;
