import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";

function EditProfile() {
  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        <PageContent>
          <p>Edit profile</p>
        </PageContent>
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default EditProfile;
