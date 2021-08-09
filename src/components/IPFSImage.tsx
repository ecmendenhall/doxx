import { useIpfsUrl } from "react-ipfs-url";
import { create, IPFSHTTPClient } from "ipfs-http-client";
import { useEffect, useState } from "react";

const IPFSProvider = () => {
  const [loadingState, setLoadingState] = useState("pending");
  const [ipfs, setIpfs] = useState<IPFSHTTPClient>();

  useEffect(() => {
    const loadIPFS = async () => {
      if (loadingState === "pending") {
        setLoadingState("loading");
        const ipfs = create({ url: "http://127.0.0.1:8081" });
        setIpfs(ipfs);
        setLoadingState("loaded");
      }
    };
    loadIPFS();
  });

  return (
    <>
      {loadingState}
      {ipfs && (
        <IPFSImage
          ipfs={ipfs}
          src="/ipfs/QmZD41nhZgcN7WTodubWyM1DLQkSCEF5FsZX1izXBxxgAn"
        />
      )}
    </>
  );
};

interface IPFSImageProps {
  ipfs: IPFSHTTPClient;
  src: string;
}
const IPFSImage = ({ ipfs, src }: IPFSImageProps) => {
  const { status, value } = useIpfsUrl(ipfs, src);

  return (
    <>
      {status === "pending" && "Loading..."}
      {status === "rejected" && "Oops, failed to load"}
      {status === "fulfilled" && <img src={value} alt="" />}
    </>
  );
};

export default IPFSProvider;
