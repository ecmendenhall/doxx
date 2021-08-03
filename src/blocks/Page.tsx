import { Block } from "../blocks";
import useApp from "../hooks/useApp";

const Page = ({ properties, format, id }: Block) => {
  const { state, setActivePage } = useApp();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        const page = state.blocks.blocks.get(id);
        page && setActivePage(page.id);
      }}
    >
      <span className="text-l">{format.page_icon}</span>{" "}
      <span className="underline">{properties.title}</span>
    </div>
  );
};

export default Page;
