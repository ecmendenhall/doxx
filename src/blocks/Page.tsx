import { Block } from "../blocks";

const Page = ({ properties, format }: Block) => {
  return (
    <span className="font-medium">
      <span className="text-l">{format.page_icon}</span>{" "}
      <span className="underline">{properties.title}</span>
    </span>
  );
};

export default Page;
