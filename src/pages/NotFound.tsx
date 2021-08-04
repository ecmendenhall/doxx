import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import NotFound from "../components/ui/NotFound";

function NotFoundPage() {
  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        <NotFound />
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default NotFoundPage;
