import Content from "../components/Content";
import Grid from "../components/Grid";
import Pages from "../components/Pages";
import Sidebar from "../components/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/Blocks";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
}

function Page() {
  let { id } = useParams<Params>();

  return (
    <Grid>
      <Sidebar>
        <Pages />
      </Sidebar>
      <Content>
        <Editor>
          <p>Page: {id}</p>
          <Blocks />
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default Page;
