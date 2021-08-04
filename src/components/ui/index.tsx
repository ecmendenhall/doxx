export const formatId = (id: string) => {
  return id.split("://")[1];
};

export const formatTitle = (html: string) => {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return (divContainer.textContent || "").replaceAll(/\n/g, " ");
};

export const formatAddress = function (address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "gray-400";
    case "loading":
      return "yellow-400";
    case "done":
      return "green-400";
    case "failed":
      return "red-500";
  }
};
