import Content from "../components/Content";
import Grid from "../components/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/PageHeader";
import Editor from "../components/Editor";

function EditProfile() {
  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        <Editor>
          <p>Edit profile</p>
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default EditProfile;
