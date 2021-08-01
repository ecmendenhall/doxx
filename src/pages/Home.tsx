import ConnectWallet from "../components/ConnectWallet";
import Content from "../components/Content";
import Grid from "../components/Grid";
import CreatePage from "../components/CreatePage";
import PagesList from "../components/PagesList";
import Sidebar from "../components/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/Blocks";
import Editor from "../components/Editor";
import useApp from "../hooks/useApp";
import { useEffect } from "react";
import Menu from "../components/Menu";
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
        <Editor>
          <Blocks />
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default Home;
