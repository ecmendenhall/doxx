import ConnectWallet from "../components/ConnectWallet";
import Content from "../components/Content";
import Grid from "../components/Grid";
import NewPage from "../components/NewPage";
import Pages from "../components/Pages";
import Sidebar from "../components/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/Blocks";
import Editor from "../components/Editor";
import useApp from "../hooks/useApp";
import { useEffect } from "react";

function Home() {
  const { state, loadPages, loadBlocks } = useApp();

  useEffect(() => {
    if (
      state.ceramic.auth.status === "done" &&
      state.ceramic.status === "done"
    ) {
      loadPages(state.ceramic.auth.idx, state.ceramic.ceramic);
      loadBlocks(state.ceramic.auth.idx, state.ceramic.ceramic);
    }
  }, [state.ceramic, loadBlocks]);

  return (
    <Grid>
      <Sidebar>
        <Pages />
        <NewPage />
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
