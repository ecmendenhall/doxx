import Content from "../components/Content";
import Grid from "../components/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import Connections from "../components/Connections";
import NotFound from "../components/NotFound";

function NotFoundPage() {
  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        <NotFound />
        <Connections />
      </Content>
    </Grid>
  );
}

export default NotFoundPage;
