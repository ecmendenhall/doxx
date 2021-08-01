import ConnectWallet from "./components/ConnectWallet";
import Content from "./components/Content";
import Grid from "./components/Grid";
import NewPage from "./components/NewPage";
import Pages from "./components/Pages";
import Sidebar from "./components/Sidebar";
import Connections from "./components/Connections";
import Blocks from "./components/Blocks";
import Editor from "./components/Editor";

function App() {
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

export default App;
