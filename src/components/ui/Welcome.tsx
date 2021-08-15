import Button from "./Button";
import { EmojiHero } from "./EmojiHero";

const Welcome = () => {
  return (
    <div className="flex flex-col col-span-3 h-screen justify-center content-center py-36">
      <div className="flex flex-row justify-center">
        <div className="p-16 pb-72">
          <h1 className="font-script tracking-tighter text-purple-800 text-9xl mb-4">
            📑 Doxx
          </h1>
          <div className="text-xl py-2 mb-4 max-w-prose leading-normal rounded bg-gray-100 shadow-sm">
            <div className="flex flex-row px-4 items-center">
              <div>
                <EmojiHero
                  emoji={"📓"}
                  size="4xl"
                  hover={false}
                  onClick={() => {}}
                />
              </div>
              <p className="ml-4 p-4">
                Doxx is a web3 notebook linked to your{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://ens.domains/"
                  target="_blank"
                  rel="noreferrer"
                >
                  ENS name
                </a>{" "}
                or{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://ethereum.org/wallets/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ethereum address
                </a>
                . It uses{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://idx.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  IDX
                </a>
                ,{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://ceramic.network/"
                  target="_blank"
                  rel="norefferrer"
                >
                  Ceramic
                </a>
                ,{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://ipfs.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  IPFS
                </a>
                , and{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-700"
                  href="https://web3.storage/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Web3.storage
                </a>{" "}
                to publish your documents on the decentralized web.
              </p>
            </div>
            <div className="flex flex-row px-4">
              <div>
                <EmojiHero
                  emoji={"✍️"}
                  size="4xl"
                  hover={false}
                  onClick={() => {}}
                />
              </div>
              <p className="ml-4 p-4">
                Use Doxx as a blog, profile, journal, homepage, and more. Edit
                text, upload files and images, and embed content.
              </p>
            </div>
            <div className="flex flex-row px-4">
              <div>
                <EmojiHero
                  emoji={"⚠️"}
                  size="4xl"
                  hover={false}
                  onClick={() => {}}
                />
              </div>
              <p className="ml-4 p-4">
                Your Doxx are public, so publish wisely!
              </p>
            </div>
          </div>
          <button className="text-xl bg-purple-100 hover:bg-purple-300 py-2 px-4 rounded-lg shadow-md">
            Doxx Me!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
