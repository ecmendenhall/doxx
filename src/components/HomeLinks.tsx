import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";
import CreatePage from "./CreatePage";
import Pages from "./Pages";

const HomeLinks = () => {
  const { state } = useApp();

  return (
    <div className="flex flex-col col-span-3 h-screen justify-center content-center py-36">
      <div className="flex flex-row justify-evenly">
        <div>
          <h1 className="text-2xl font-bold mb-4">Pages</h1>
          <Pages enabled={true} />
        </div>
        <div>
          <div className="p-4">
            <CreatePage
              icon={false}
              className="text-xl bg-purple-100 hover:bg-purple-300 py-2 px-4 rounded-lg shadow-md"
            />
          </div>
          {state.provider.status === "done" && (
            <div className="p-4">
              <button className="text-xl bg-purple-100 hover:bg-purple-300 py-2 px-4 rounded-lg shadow-md">
                <Link
                  to={`/${state.provider.ensName || state.provider.address}`}
                >
                  View profile
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeLinks;
