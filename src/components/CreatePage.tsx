import CeramicClient from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import useApp from "../hooks/useApp";
import idx from "../lib/idx";

const createFakePage = async (idxClient: IDX, ceramic: CeramicClient) => {
  const adjectives = ["Cool", "Sweet", "Rad"];
  const emoji = ["🎉", "🌈", "✨"];
  return await idx.createPage(idxClient, ceramic, {
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

const CreatePage = () => {
  const {
    state: { idx, ceramic },
    newPage,
    setActivePage,
  } = useApp();

  return (
    <button
      onClick={async () => {
        if (idx.status === "done" && ceramic.status === "done") {
          const page = await createFakePage(idx.idx, ceramic.ceramic);
          console.log(page);
          newPage(page);
          setActivePage(page);
        }
      }}
      className="absolute bottom-0 left-0 w-full p-2 text-left hover:bg-purple-300 border-purple-200 border-t-2"
    >
      <span className="text-xl">+</span> New page
    </button>
  );
};

export default CreatePage;
