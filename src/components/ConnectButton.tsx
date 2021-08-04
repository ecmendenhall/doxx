import useApp from "../hooks/useApp";
import { ConnectIDX } from "./ConnectIDX";
import { ConnectWallet } from "./ConnectWallet";

const ConnectButton = () => {
  const {
    state: {
      provider: { status },
    },
  } = useApp();

  if (status === "done") {
    return <ConnectIDX />;
  } else {
    return <ConnectWallet />;
  }
};

export default ConnectButton;
