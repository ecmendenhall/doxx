import useApp from "../hooks/useApp";
import { Connected } from "./Connected";
import Button from "./ui/Button";

export const ConnectIDX = () => {
  const {
    state: { provider, idx },
    loadIDX,
  } = useApp();

  if (provider.status === "done" && idx.status !== "done") {
    const onClick = () => {
      loadIDX(provider.provider);
    };

    return (
      <Button onClick={onClick} primary>
        Log in with IDX
      </Button>
    );
  } else {
    return <Connected />;
  }
};

export default ConnectIDX;
