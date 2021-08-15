import ConnectWallet from "../components/ConnectButton";
import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import CreatePage from "../components/CreatePage";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";
import useApp from "../hooks/useApp";
import { useEffect } from "react";
import Menu from "../components/ui/Menu";
import CopyLink from "../components/CopyLink";
import Welcome from "../components/ui/Welcome";
import HomeLinks from "../components/HomeLinks";

function Home() {
  const { state, loadCeramic, loadPages, loadBlocks } = useApp();

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    if (state.idx.status === "done" && state.ceramic.status === "done") {
      if (state.pages.status === "pending") {
        loadPages(state.idx.idx, state.ceramic.ceramic);
      }
      if (state.blocks.status === "pending") {
        loadBlocks(state.idx.idx, state.ceramic.ceramic);
      }
    }
  }, [
    state.ceramic,
    state.idx,
    state.pages,
    state.blocks,
    loadPages,
    loadBlocks,
  ]);

  return (
    <Grid>
      <Sidebar>
        <PagesList
          content={[...state.pages.pageIds, ...state.pages.draftIds]}
          level={0}
          edit
        />
        <CreatePage icon />
      </Sidebar>
      <Content>
        <Menu>
          <CopyLink />
          <ConnectWallet />
        </Menu>
        {state.idx.status === "done" ? <HomeLinks /> : <Welcome />}
        <PageContent />
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default Home;
