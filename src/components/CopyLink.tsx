import { useState } from "react";
import { Page } from "../blocks";
import useActivePage from "../hooks/useActivePage";
import { formatId } from "./ui";
import Button from "./ui/Button";
import LinkIcon from "./ui/LinkIcon";

const CopyLink = () => {
  const { page } = useActivePage();
  const [copyStatus, setCopyStatus] = useState("pending");

  const copy = async (page: Page) => {
    const path = formatId(page.id);
    const url = `${document.location.protocol}//${document.location.host}/#/pages/${path}`;
    await navigator.clipboard.writeText(url);
    setCopyStatus("copied");
    setTimeout(() => {
      setCopyStatus("pending");
    }, 1800);
  };

  return (
    <span>
      {page && (
        <Button onClick={() => copy(page)} primary={false}>
          <LinkIcon /> {copyStatus === "pending" ? "Copy Link" : "Link Copied!"}
        </Button>
      )}
    </span>
  );
};

export default CopyLink;
