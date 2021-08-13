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
  const [status, setStatus] = useState("pending");

  const onClick = async (page: Page) => {
    if (status == "pending") {
      setStatus("confirm");
    }
    if (
      idx.status === "done" &&
      ceramic.status === "done" &&
      status === "confirm"
    ) {
      setStatus("deleting");
      await deletePage(idx.idx, ceramic.ceramic, page.id);
      setActivePage("");
    }
  };

  return (
    <span>
      {page && (
        <Button onClick={() => onClick(page)} primary={false}>
          {status === "pending" && "Delete Page"}
          {status === "confirm" && "Really?"}
          {status === "deleting" && "Deleting..."}
        </Button>
      )}
    </span>
  );
};

export default DeletePage;
