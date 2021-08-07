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

function Home() {
  const { state, loadCeramic, loadPages, loadBlocks } = useApp();

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    if (state.idx.status === "done" && state.ceramic.status === "done") {
      loadPages(state.idx.idx, state.ceramic.ceramic);
      loadBlocks(state.idx.idx, state.ceramic.ceramic);
    }
  }, [state.ceramic, state.idx, loadPages, loadBlocks]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
        <CreatePage />
      </Sidebar>
      <Content>
        <Menu>
          <CopyLink />
          <ConnectWallet />
        </Menu>
        <PageContent />
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default Home;
