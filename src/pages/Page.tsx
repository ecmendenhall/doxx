import Grid from "../components/ui/Grid";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import ceramic from "../lib/ceramic";
import idx from "../lib/idx";
import NotFound from "../components/ui/NotFound";
import FullPage from "../components/ui/FullPage";
import Menu from "../components/ui/Menu";
import { Link } from "react-router-dom";
import Editor from "../components/Editor";

interface Params {
  id: string;
}

const idxClient = ceramic.getReadOnlyIDX();

function Page() {
  let { id } = useParams<Params>();
  let { state, loadCeramic, setBlock, setActivePage } = useApp();
  let [loadingState, setLoadingState] = useState("pending");

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    const loadPage = async () => {
      if (state.ceramic.status === "done" && loadingState === "pending") {
        setLoadingState("loading");
        try {
          const block = await ceramic.readBlock(state.ceramic.ceramic, id);
          console.log(block.controllers);
          const accounts = await idx.loadAccounts(
            idxClient,
            block.controllers[0]
          );
          console.log(accounts);
          const profile = await idx.loadProfile(
            idxClient,
            block.controllers[0]
          );
          console.log(profile);
          const children = await ceramic.readBlocks(
            state.ceramic.ceramic,
            block.content
          );
          [block, ...children].forEach((b) => {
            setBlock(b);
          });
          setActivePage(block.id);
          setLoadingState("loaded");
        } catch (e) {
          setLoadingState("failed");
        }
      }
    };
    loadPage();
  }, [state.ceramic, id, setBlock, setActivePage]);

  return (
    <Grid>
      <FullPage>
        {loadingState === "failed" ? (
          <NotFound />
        ) : (
          <div>
            <Menu>
              <Link to="/">
                <h1 className="font-script text-purple-800 text-2xl">
                  📑 Doxx
                </h1>
              </Link>
            </Menu>
            <PageContent>
              <Editor enabled={false} />
            </PageContent>
          </div>
        )}
        <StatusPanel />
      </FullPage>
    </Grid>
  );
}

export default Page;
