import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import ceramic from "../lib/ceramic";
import NotFound from "../components/ui/NotFound";
import PageHeader from "../components/PageHeader";

interface Params {
  id: string;
}

function Page() {
  let { id } = useParams<Params>();
  let { state, loadCeramic, setActivePage } = useApp();
  let [loadingState, setLoadingState] = useState("loading");

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    const loadPage = async () => {
      if (state.ceramic.status === "done") {
        try {
          const page = await ceramic.readBlock(state.ceramic.ceramic, id);
          setActivePage(page.id);
          setLoadingState("loaded");
          console.log(page);
        } catch (e) {
          setLoadingState("failed");
        }
      }
    };
    loadPage();
  }, [state.ceramic, id, setActivePage]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        {loadingState === "failed" ? (
          <NotFound />
        ) : (
          <PageContent>
            <PageHeader />
          </PageContent>
        )}
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default Page;
