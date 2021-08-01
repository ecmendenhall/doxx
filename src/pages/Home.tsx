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

function Home() {
  const { state, loadCeramic, loadPages, loadBlocks } = useApp();

  useEffect(() => {
    loadCeramic();
  }, []);

  useEffect(() => {
    if (state.idx.status === "done" && state.ceramic.status === "done") {
      loadPages(state.idx.idx, state.ceramic.ceramic);
      loadBlocks(state.idx.idx, state.ceramic.ceramic);
    }
  }, [state.ceramic, loadBlocks]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
        <CreatePage />
      </Sidebar>
      <Content>
        <ConnectWallet />
        <Editor>
          <Blocks />
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default Home;
