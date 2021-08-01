import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
});

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
};

export default exp;
