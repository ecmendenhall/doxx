import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";
import { ConnectIDX } from "./ConnectIDX";
import { formatAddress } from "./ui";
import Button from "./ui/Button";

export const Connected = () => {
  const { state } = useApp();

  const onClick = () => {};

  if (state.provider.status === "done") {
    const { ensName, address } = state.provider;

    return (
      <Button onClick={onClick} primary>
        <Link to={`/${ensName || address}`}>
          {ensName ? ensName : formatAddress(address)}
        </Link>
      </Button>
    );
  } else {
    return <ConnectIDX />;
  }
};

export default Connected;
