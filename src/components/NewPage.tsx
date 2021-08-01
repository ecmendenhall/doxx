import CeramicClient from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import useApp from "../hooks/useApp";
import idx from "../lib/idx";

const createFakePage = (idxClient: IDX, ceramic: CeramicClient) => {
  const adjectives = ["Cool", "Sweet", "Rad"];
  const emoji = ["🎉", "🌈", "✨"];
  idx.createBlock(idxClient, ceramic, {
    type: "page",
    properties: {
      title: [
        [
          `My ${
            adjectives[Math.floor(Math.random() * adjectives.length)]
          } Page`,
        ],
      ],
    },
    content: [],
    format: {
      page_icon: emoji[Math.floor(Math.random() * emoji.length)],
    },
    parent: "",
  });
};

const NewPage = () => {
  const {
    state: { ceramic },
  } = useApp();

  return (
    <button
      onClick={() => {
        if (ceramic.auth.status === "done" && ceramic.status === "done") {
          createFakePage(ceramic.auth.idx, ceramic.ceramic);
        }
      }}
      className="absolute bottom-0 left-0 w-full p-2 text-left hover:bg-purple-300 border-purple-200 border-t-2"
    >
      + New page
    </button>
  );
};

export default NewPage;
