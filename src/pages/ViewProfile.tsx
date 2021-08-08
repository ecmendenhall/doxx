import Content from "../components/ui/Content";
import Grid from "../components/ui/Grid";
import PagesList from "../components/PagesList";
import Sidebar from "../components/ui/Sidebar";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ceramic from "../lib/ceramic";
import idx from "../lib/idx";
import useApp from "../hooks/useApp";
import { Web3Provider } from "@ethersproject/providers";
import { utils } from "ethers";
import { BasicProfile } from "@ceramicstudio/idx-constants";
import Profile from "../components/ui/Profile";
import Menu from "../components/ui/Menu";

interface Params {
  id: string;
}

const idxClient = ceramic.getReadOnlyIDX();

const caip10FromAddress = (address: string) => {
  return `${address}@eip155:1`.toLowerCase();
};

const parseENSName = (name: string) => {
  if (name.endsWith(".eth")) {
    return name;
  } else {
    return `${name}.eth`;
  }
};

const parseAddress = (address: string) => {
  return utils.getAddress(address);
};

const parseId = async (id: string, provider: Web3Provider) => {
  try {
    return [null, parseAddress(id)];
  } catch (e) {
    console.log(e);
    try {
      const name = parseENSName(id);
      return [name, await provider.resolveName(name)];
    } catch (e) {
      console.log(e);
      return [null, null];
    }
  }
};

const getProfile = async (address: string) => {
  try {
    const caip10 = caip10FromAddress(address);
    return await idx.loadProfile(idxClient, caip10);
  } catch (e) {
    console.log(e);
  }
};

function ViewProfile() {
  const { id } = useParams<Params>();
  const {
    state: { provider },
    loadProvider,
    loadCeramic,
  } = useApp();
  let [loadingState, setLoadingState] = useState("pending");
  let [profile, setProfile] =
    useState<{ name: string | null; address: string; profile: BasicProfile }>();

  useEffect(() => {
    const loadProfile = async (provider: Web3Provider) => {
      try {
        const [name, address] = await parseId(id, provider);
        if (address) {
          const profile = await getProfile(address);
          console.log(profile);
          if (profile) {
            setProfile({ name, address, profile });
            setLoadingState("loaded");
          } else {
            setLoadingState("not found");
          }
        } else {
          setLoadingState("not found");
        }
      } catch (e) {
        console.log(e);
        setLoadingState("failed");
      }
    };
    if (loadingState === "pending") {
      setLoadingState("loading");
      loadProvider();
      loadCeramic();
    }
    if (loadingState === "loading" && provider.status === "done") {
      loadProfile(provider.provider);
    }
  }, [id, provider, loadingState, loadProvider, loadCeramic]);

  return (
    <Grid>
      <Sidebar>
        <PagesList />
      </Sidebar>
      <Menu>
        <div className="lg:hidden bg-gray-100 p-2 shadow-md rounded-lg">
          <Link to="/">
            <h1 className="font-script text-purple-800 text-2xl">📑 Doxx</h1>
          </Link>
        </div>
      </Menu>
      <Content>
        {profile && <Profile {...profile} />}
        <StatusPanel />
      </Content>
    </Grid>
  );
}

export default ViewProfile;
