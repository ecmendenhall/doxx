import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

const WEB3_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU0YzBBMzQ1NDZGZTY5MEZFOTlENDdFNDFkQ0NhQjNBZmEwNjlEZmYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg2MzUyNTkxOTQsIm5hbWUiOiJEb3h4In0.EbYI90cvZpxLK-YjVAvi2QmumOhvpRUY19QeOdLcqFY";

const getClient = () => {
  return new Web3Storage({ token: WEB3_STORAGE_TOKEN });
};

const storeFiles = async (files: File[]) => {
  const client = getClient();
  const cid = await client.put(files);
  return cid;
};

const gatewayUrl = (ipfsUrl: string | undefined) => {
  if (ipfsUrl) {
    const [, path] = ipfsUrl.split("ipfs://");
    const [cid, filename] = path.split("/");
    return `https://${cid}.ipfs.dweb.link/${filename}`;
  }
};

const exp = {
  storeFiles,
  gatewayUrl,
};

export default exp;
