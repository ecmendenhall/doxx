import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import Editor from "../components/Editor";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import NotFound from "../components/ui/NotFound";
import Menu from "../components/ui/Menu";
import CopyLink from "../components/CopyLink";
import ConnectWallet from "../components/ConnectButton";
import CreatePage from "../components/CreatePage";
import PageContent from "../components/ui/Editor";
import DeletePage from "../components/DeletePage";
import useActivePage from "../hooks/useActivePage";
import PageIndexSchema from "../schemas/eth.doxx.PageIndex";

interface Params {
  id: string;
}

function Page() {
  let { id } = useParams<Params>();
  let { state, loadCeramic, loadPage, setActivePage } = useApp();
  let { page } = useActivePage();
  let [loadingState, setLoadingState] = useState("pending");

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    if (state.ceramic.status === "done" && loadingState == "pending") {
      setLoadingState("loading");
      loadPage(state.ceramic.ceramic, `ceramic://${id}`);
    }
  }, [state.ceramic.status, id]);

  useEffect(() => {
    if (state.blocks.status === "done") {
      const page = state.blocks.blocks.get(`ceramic://${id}`);
      if (page) {
        setActivePage(page.id);
        setLoadingState("loaded");
      } else {
        setLoadingState("failed");
      }
    }
  }, [id, setActivePage, state.blocks]);

  return (
    <Grid>
      <Sidebar>
        <PagesList
          content={[...state.pages.pageIds, ...state.pages.draftIds]}
          level={0}
        />
        <CreatePage />
      </Sidebar>
      <Content>
        {loadingState === "failed" && <NotFound />}
        {loadingState === "loaded" && !page && <Redirect to="/" />}
        {loadingState === "loaded" && page && (
          <div className="col-span-3">
            <Menu>
              <DeletePage />
              <CopyLink />
              <ConnectWallet />
            </Menu>
            <PageContent>
              <Editor enabled />
            </PageContent>
          </div>
        )}
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default Page;
