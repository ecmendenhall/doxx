import Content from "../components/Content";
import Grid from "../components/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/Sidebar";
import Connections from "../components/Connections";
import Blocks from "../components/Blocks";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ceramic from "../lib/ceramic";
import idx from "../lib/idx";

interface Params {
  id: string;
}

function ViewProfile() {
  const { id } = useParams<Params>();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const idxClient = ceramic.getReadOnlyIDX();
        const profile = await idx.loadProfile(idxClient, id);
        console.log(profile);
      } catch (e) {
        console.log(e);
      }
    };
    loadProfile();
  }, []);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Content>
        <Editor>
          <p>View profile: {id}</p>
          <Blocks />
        </Editor>
        <Connections />
      </Content>
    </Grid>
  );
}

export default ViewProfile;
