import Content from "../components/Content";
import Grid from "../components/Grid";
import Pages from "../components/Pages";
import Sidebar from "../components/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/Blocks";
import Editor from "../components/Editor";

function EditProfile() {
  return (
    <Grid>
      <Sidebar>
        <Pages />
      </Sidebar>
      <Content>
        <Editor>
          <p>Edit profile</p>
          <Blocks />
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default EditProfile;
