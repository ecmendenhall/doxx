import CeramicClient from "@ceramicnetwork/http-client";
import { useState } from "react";
import { Page } from "../blocks";
import useActivePage from "../hooks/useActivePage";
import useApp from "../hooks/useApp";
import Button from "./ui/Button";
import TrashIcon from "./ui/TrashIcon";

const DeletePage = () => {
  const {
    state: { idx, ceramic },
    deletePage,
    setActivePage,
  } = useApp();
  const { page } = useActivePage();
  const [deleting, setDeleting] = useState(false);

  const onClick = async (page: Page) => {
    if (idx.status === "done" && ceramic.status === "done") {
      setDeleting(true);
      await deletePage(idx.idx, ceramic.ceramic, page.id);
      setActivePage("");
    }
  };

  return (
    <span>
      {page && (
        <Button onClick={() => onClick(page)} primary={false}>
          {deleting ? "Deleting..." : "Delete Page"}
        </Button>
      )}
    </span>
  );
};

export default DeletePage;
