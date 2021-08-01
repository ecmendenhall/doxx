import { Block } from "../blocks";

const Page = ({ properties, format }: Block) => {
  return (
    <div>
      <span className="text-l">{format.page_icon}</span>{" "}
      <span className="underline">{properties.title}</span>
    </div>
  );
};

export default Page;
