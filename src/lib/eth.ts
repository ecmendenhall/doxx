import { InfuraProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { WalletLink } from "walletlink";
import Web3Modal from "web3modal";
import coinbaseLogo from "../img/coinbase-wallet.svg";

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: "4ea3d70e787e400cbf91e18dcd8796d1" },
    },
    "custom-walletlink": {
      display: {
        logo: coinbaseLogo,
        name: "WalletLink",
        description: "Scan with WalletLink to connect",
      },
      options: {
        appName: "Doxx",
        networkUrl: `https://mainnet.infura.io/v3/4ea3d70e787e400cbf91e18dcd8796d1`,
        chainId: 1,
      },
      package: WalletLink,
      connector: async (_, options) => {
        const { appName, networkUrl, chainId } = options;
        const walletLink = new WalletLink({
          appName,
        });
        const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
        await provider.enable();
        return provider;
      },
    },
  },
});

const getReadOnlyProvider = () => {
  return new InfuraProvider(1, "4ea3d70e787e400cbf91e18dcd8796d1");
};

const loadProvider = async () => {
  const provider = await web3Modal.connect();
  const web3Provider = new Web3Provider(provider);
  const signer = await web3Provider.getSigner();
  const address = await signer.getAddress();
  const ensName = await web3Provider.lookupAddress(address);
  return [web3Provider, signer, address, ensName] as const;
};

const exp = {
  loadProvider,
  getReadOnlyProvider,
};

export default exp;
