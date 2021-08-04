import useApp from "../hooks/useApp";
import Button from "./ui/Button";

export const ConnectWallet = () => {
  const { loadProvider, loadCeramic } = useApp();

  const onClick = async () => {
    await loadProvider();
    await loadCeramic();
  };

  return (
    <Button onClick={onClick} primary>
      Connect Wallet
    </Button>
  );
};
