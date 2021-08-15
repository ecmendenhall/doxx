import { InfuraProvider, Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

const POH_REGISTRY_ADDRESS = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb";

const getPOHRegistry = (provider: Web3Provider | InfuraProvider) => {
  const abi = [
    "function isRegistered(address _submissionId) view returns (bool)",
  ];
  return new ethers.Contract(POH_REGISTRY_ADDRESS, abi, provider);
};

const isVerified = (
  provider: Web3Provider | InfuraProvider,
  address: string
) => {
  return getPOHRegistry(provider).isRegistered(address);
};

const exp = {
  isVerified,
};

export default exp;
