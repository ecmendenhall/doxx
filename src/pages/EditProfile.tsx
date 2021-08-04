import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import Editor from "../components/ui/Editor";

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
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default EditProfile;
