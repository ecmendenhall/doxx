import Grid from "../components/ui/Grid";
import StatusPanel from "../components/StatusPanel";
import PageContent from "../components/ui/Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApp from "../hooks/useApp";
import ceramic from "../lib/ceramic";
import idx from "../lib/idx";
import NotFound from "../components/ui/NotFound";
import FullPage from "../components/ui/FullPage";
import Menu from "../components/ui/Menu";
import { Link } from "react-router-dom";
import Editor from "../components/Editor";
import { CryptoAccounts } from "@ceramicstudio/idx-constants";
import { utils } from "ethers";
import { InfuraProvider } from "@ethersproject/providers";
import Author from "../components/ui/Author";
import eth from "../lib/eth";

interface Params {
  id: string;
}

const idxClient = ceramic.getReadOnlyIDX();
const provider = eth.getReadOnlyProvider();

const getAddressFromAccounts = (accounts: CryptoAccounts) => {
  const [caip10] = Object.entries(accounts).filter(([caip10, _]) => {
    return caip10.endsWith("@eip155:1");
  })[0];
  return caip10.split("@eip155:1")[0];
};

const getNameFromAddress = async (
  provider: InfuraProvider,
  address: string
) => {
  return await provider.lookupAddress(utils.getAddress(address));
};

interface AuthorInfo {
  name?: string;
  address?: string;
}

function Page() {
  let { id } = useParams<Params>();
  let { state, loadProvider, loadCeramic, setBlock, setActivePage } = useApp();
  let [loadingState, setLoadingState] = useState("pending");
  let [author, setAuthor] = useState<AuthorInfo>({});

  useEffect(() => {
    loadCeramic();
  }, [loadCeramic, loadProvider]);

  useEffect(() => {
    const loadPage = async () => {
      if (state.ceramic.status === "done" && loadingState === "pending") {
        setLoadingState("loading");
        try {
          const block = await ceramic.readBlock(state.ceramic.ceramic, id);
          const accounts = await idx.loadAccounts(
            idxClient,
            block.controllers[0]
          );
          console.log(accounts);
          if (accounts) {
            const address = getAddressFromAccounts(accounts);
            const name = await getNameFromAddress(provider, address);
            setAuthor({ name, address });
          }
          const profile = await idx.loadProfile(
            idxClient,
            block.controllers[0]
          );
          console.log(profile);
          const children = await ceramic.readBlocks(
            state.ceramic.ceramic,
            block.content
          );
          [block, ...children].forEach((b) => {
            setBlock(b);
          });
          setActivePage(block.id);
          setLoadingState("loaded");
        } catch (e) {
          setLoadingState("failed");
        }
      }
    };
    loadPage();
  }, [state.ceramic, id, loadingState, setBlock, setActivePage]);

  return (
    <Grid>
      <FullPage>
        {loadingState === "failed" ? (
          <NotFound />
        ) : (
          <div>
            <div className="fixed top-8 left-12 space-x-2 z-50">
              <div className="bg-white p-2 shadow-md rounded-lg">
                <Link to="/">
                  <h1 className="font-script tracking-tighter text-purple-800 text-2xl">
                    📑 Doxx
                  </h1>
                </Link>
              </div>
            </div>
            <div className="fixed top-8 left-10 space-x-2 z-50"></div>
            <Menu>
              <Author {...author} />
            </Menu>
            <PageContent>
              <div className="p-8">
                <Editor enabled={false} />
              </div>
            </PageContent>
          </div>
        )}
        <StatusPanel />
      </FullPage>
    </Grid>
  );
}

export default Page;
