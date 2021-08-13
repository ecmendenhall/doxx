import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import Menu from "../components/ui/Menu";
import useApp from "../hooks/useApp";
import { useEffect } from "react";
import ConnectButton from "../components/ConnectButton";
import EditProfileForm, { FileData } from "../components/ui/EditProfileForm";
import { BasicProfile } from "@ceramicstudio/idx-tools/dist/schemas";
import idxClient from "../lib/idx";
import storage from "../lib/storage";

function EditProfile() {
  const {
    state: { idx, ceramic, provider, profile, pages },
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
  }, [ceramic, idx, provider, loadProfile]);

  const getImageDimensions = async (
    dataURL: string
  ): Promise<{ height: number; width: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width,
        });
      };
      img.src = dataURL;
    });
  };

  const saveProfile = async (profileData: BasicProfile, fileData: FileData) => {
    if (idx.status === "done") {
      console.log(fileData);
      const files = Object.values(fileData);
      if (files.length > 0) {
        const cid = await storage.storeFiles(files);
        Object.entries(fileData).forEach(async ([name, file]) => {
          console.log(name);
          console.log(file);
          const url = URL.createObjectURL(file);
          const { height, width } = await getImageDimensions(url);
          const imageData = {
            src: `ipfs://${cid}/${file.name}`,
            mimeType: file.type,
            width: width,
            height: height,
            size: file.size,
          };
          URL.revokeObjectURL(url);
          profileData[name] = { original: imageData };
        });
      }
      return await idxClient.saveProfile(idx.idx, profileData);
    }
  };

  return (
    <Grid>
      <Sidebar>
        <PagesList content={[...pages.pageIds, ...pages.draftIds]} level={0} />
      </Sidebar>
      <Menu>
        <ConnectButton />
      </Menu>
      <Content>
        {profile.status === "done" &&
          provider.status === "done" &&
          profile.profile && (
            <EditProfileForm profile={profile.profile} onSubmit={saveProfile} />
          )}
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default EditProfile;
