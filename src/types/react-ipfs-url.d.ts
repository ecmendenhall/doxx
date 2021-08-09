declare module "react-ipfs-url" {
  import { IPFSHTTPClient } from "ipfs-http-client";
  type urlStatus = "pending" | "rejected" | "fulfilled";
  type urlVaule = "string";
  export const useIpfsUrl: (
    ipfs: IPFSHTTPClient,
    input: string,
    options?: object
  ) => { status; value };
}
