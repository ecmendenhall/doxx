import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import Menu from "../components/ui/Menu";
import { Link } from "react-router-dom";
import useApp from "../hooks/useApp";
import { useEffect } from "react";
import ConnectButton from "../components/ConnectButton";
import EditProfileForm from "../components/ui/EditProfileForm";

function EditProfile() {
  const {
    state: { idx, ceramic, provider, profile },
    loadCeramic,
    loadProfile,
  } = useApp();

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic]);

  useEffect(() => {
    if (
      provider.status === "done" &&
      idx.status === "done" &&
      ceramic.status === "done"
    ) {
      loadProfile(idx.idx, provider.address);
    }
  }, [ceramic, idx, loadProfile]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Menu>
        <ConnectButton />
      </Menu>
      <Content>
        {profile.status === "done" &&
          provider.status == "done" &&
          profile.profile && <EditProfileForm profile={profile.profile} />}
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default EditProfile;
