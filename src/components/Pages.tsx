import useApp from "../hooks/useApp";

const Pages = () => {
  const {
    state: { blocks },
    setActiveBlock,
  } = useApp();

  return (
    <ul>
      {blocks.status === "done"
        ? blocks.blocks
            .filter((b) => b.parent === "")
            .map((b) => {
              return (
                <li
                  onClick={() => setActiveBlock(b)}
                  className="hover:bg-purple-300 py-1 px-4 cursor-pointer"
                >
                  <span className="text-l">{b.format.page_icon}</span>{" "}
                  {b.properties.title}
                </li>
              );
            })
        : ""}
    </ul>
  );
};

export default Pages;
