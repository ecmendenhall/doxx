export const formatId = (id: string) => {
  return id.split("://")[1];
};

export const formatTitle = (html: string) => {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;
  return (divContainer.textContent || "").replaceAll(/\n/g, " ");
};
