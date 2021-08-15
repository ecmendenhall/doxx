import WelcomeButton from "../WelcomeButton";
import { EmojiHero } from "./EmojiHero";

const Welcome = () => {
  return (
    <div className="flex flex-col col-span-3 h-screen justify-center content-center py-36">
      <div className="flex flex-row justify-center">
        <div className="p-16">
          <h1 className="font-script tracking-tighter text-purple-800 text-6xl md:text-8xl lg:text-9xl mb-4">
            📑 Doxx
          </h1>
          <div className="py-2 mb-4 max-w-prose leading-normal rounded bg-gradient-to-tr from-blue-50 via-purple-50 to-gray-50 shadow-sm">
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
                  rel="noreferrer"
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
                Use Doxx as a blog, profile, journal, homepage, wiki, and more.
                Edit text, upload files and images, and embed rich content like
                videos, bookmarks, and NFTs.
              </p>
            </div>
            <div className="flex flex-row px-4">
              <div>
                <EmojiHero
                  emoji={"👤"}
                  size="4xl"
                  hover={false}
                  onClick={() => {}}
                />
              </div>
              <p className="ml-4 p-4">
                Create a profile linked to your address or ENS name to share
                your docs with others.
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
          <WelcomeButton />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
