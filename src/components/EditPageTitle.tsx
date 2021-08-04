import { useRefCallback } from "../hooks/useRefCallback";
import useApp from "../hooks/useApp";
import ContentEditable from "react-contenteditable";
import PageTitle from "./ui/PageTitle";
import { Page } from "../blocks";

interface Props {
  page: Page;
}

const EditPageTitle = ({ page }: Props) => {
  const {
    state: { ceramic },
    setBlock,
    saveBlock,
  } = useApp();

  const handleChange = useRefCallback(
    (evt) => {
      const updatedPage = {
        ...page,
        properties: {
          ...page.properties,
          title: [[evt.target.value.trim()]],
        },
      };
      setBlock(updatedPage);
    },
    [page]
  );

  const handleBlur = useRefCallback(() => {
    if (ceramic.status === "done") {
      saveBlock(ceramic.ceramic, page);
    }
  }, [page]);

  return (
    <PageTitle>
      <ContentEditable
        className="p-2 outline-none"
        html={page.properties.title[0][0]}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </PageTitle>
  );
};

export default EditPageTitle;
