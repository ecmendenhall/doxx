import useApp from "../hooks/useApp";
import StatusIndicator from "./StatusIndicator";

const Connections = () => {
  const { state, loadIDX, loadCeramic } = useApp();

  const onClick = () => {
    if (state.provider.status === "done") {
      loadIDX(state.provider.provider);
    }
  };

  return (
    <div className="bg-white z-50 fixed bottom-8 right-10 shadow-md py-1 px-2 rounded-lg border-1 border-gray-100">
      <StatusIndicator
        onClick={loadCeramic}
        status={state.ceramic.status}
        text="Ceramic"
      />
      <StatusIndicator onClick={onClick} status={state.idx.status} text="IDX" />
    </div>
  );
};

export default Connections;
