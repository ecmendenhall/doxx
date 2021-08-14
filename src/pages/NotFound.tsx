import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import NotFound from "../components/ui/NotFound";
import useApp from "../hooks/useApp";

function NotFoundPage() {
  const { state } = useApp();
  return (
    <Grid>
      <Sidebar>
        <PagesList
          content={[...state.pages.pageIds, ...state.pages.draftIds]}
          level={0}
          edit={false}
        />
      </Sidebar>
      <Content>
        <NotFound />
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default NotFoundPage;
