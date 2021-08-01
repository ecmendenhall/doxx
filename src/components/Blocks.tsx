import Page from "../blocks/Page";
import useApp from "../hooks/useApp";

const Blocks = () => {
  const {
    state: { blocks },
  } = useApp();

  if (blocks.status === "done") {
    return (
      <div>
        {blocks.blocks.map((block) => (
          <div>
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
