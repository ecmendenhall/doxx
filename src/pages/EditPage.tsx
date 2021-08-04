import Content from "../components/Content";
import Grid from "../components/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import Connections from "../components/Connections";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import NotFound from "../components/NotFound";
import PageHeader from "../components/PageHeader";
import Blocks from "../components/Blocks";
import Menu from "../components/Menu";
import CopyLink from "../components/CopyLink";
import ConnectWallet from "../components/ConnectWallet";

interface Params {
  id: string;
}

function Page() {
  let { id } = useParams<Params>();
  let { state, loadCeramic, loadPages, loadBlocks, setActivePage } = useApp();
  let [loadingState, setLoadingState] = useState("loading");

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    if (state.idx.status === "done" && state.ceramic.status === "done") {
      loadPages(state.idx.idx, state.ceramic.ceramic);
      loadBlocks(state.idx.idx, state.ceramic.ceramic);
    }
  }, [state.ceramic, state.idx, loadPages, loadBlocks]);

  useEffect(() => {
    const loadPage = async () => {
      if (state.blocks.status === "done") {
        const page = state.blocks.blocks.get(`ceramic://${id}`);
        if (page) {
          setActivePage(page.id);
          setLoadingState("loaded");
        } else {
          setLoadingState("failed");
        }
      }
    };
    loadPage();
  }, [
    state.ceramic,
    id,
    setActivePage,
    state.blocks.blocks,
    state.blocks.status,
  ]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        {loadingState === "failed" ? (
          <NotFound />
        ) : (
          <div>
            <Menu>
              <CopyLink />
              <ConnectWallet />
            </Menu>
            <Editor>
              <PageHeader />
              <Blocks />
            </Editor>
          </div>
        )}
        <Connections />
      </Content>
    </Grid>
  );
}

export default Page;
