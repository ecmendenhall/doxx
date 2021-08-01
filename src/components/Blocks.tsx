import Page from "../blocks/Page";
import useApp from "../hooks/useApp";

const Blocks = () => {
  const {
    state: { blocks, activePage },
  } = useApp();

  if (activePage) {
    return (
      <div className="text-xl">
        <div className="text-8xl my-4">
          <span className="p-2 rounded-sm hover:bg-gray-100">
            {activePage.format.page_icon}
          </span>
        </div>
        <h1 className="font-bold text-4xl my-4">
          <span className="p-2 rounded-sm hover:bg-gray-100">
            {activePage.properties.title}
          </span>
        </h1>
        {Array.from(blocks.blocks).map(([id, block]) => (
          <div className="my-1 rounded-sm hover:bg-gray-100">
            <Page {...block} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Blocks;
