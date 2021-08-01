import { useEffect } from "react";
import useApp from "../hooks/useApp";

const formatAddress = function (address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

const Connected = () => {
  const { state } = useApp();

  if (state.provider.status === "done") {
    const { ensName, address } = state.provider;

    return (
      <button className="bg-purple-100 hover:bg-purple-300 py-1 px-2 rounded-lg shadow-md">
        {ensName ? ensName : formatAddress(address)}
      </button>
    );
  } else {
    return <ConnectIDX />;
  }
};

const ConnectIDX = () => {
  const { state, loadIDX } = useApp();

  if (state.provider.status === "done" && state.idx.status !== "done") {
    const { provider } = state.provider;
    return (
      <button
        onClick={() => {
          loadIDX(provider);
        }}
        className="bg-purple-100 hover:bg-purple-300 py-1 px-2 rounded-lg shadow-md"
      >
        Connect IDX
      </button>
    );
  } else {
    return <Connected />;
  }
};

const Connect = () => {
  const { loadProvider, loadCeramic } = useApp();

  return (
    <button
      className="bg-purple-100 hover:bg-purple-300 py-1 px-2 rounded-lg shadow-md"
      onClick={async () => {
        await loadProvider();
        await loadCeramic();
      }}
    >
      Connect Wallet
    </button>
  );
};

const ConnectButton = () => {
  const { state } = useApp();

  if (state.provider.status === "done") {
    return <ConnectIDX />;
  } else {
    return <Connect />;
  }
};

const ConnectWallet = () => {
  return (
    <div className="fixed top-8 right-10 space-x-2">
      <ConnectButton />
    </div>
  );
};

export default ConnectWallet;
