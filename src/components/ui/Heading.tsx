import { HeadingType } from "../../blocks";

interface Props {
  children: React.ReactNode;
}

interface HeadingProps {
  type: HeadingType;
  children: React.ReactNode;
}

const Heading1 = ({ children }: Props) => {
  return <h2 className="text-3xl my-4 font-bold">{children}</h2>;
};

const Heading2 = ({ children }: Props) => {
  return <h3 className="text-2xl my-2 font-bold">{children}</h3>;
};

const Heading3 = ({ children }: Props) => {
  return <h4 className="text-xl my-1 font-bold">{children}</h4>;
};

const Heading = ({ children, type }: HeadingProps) => {
  const componentByType = {
    "heading-1": <Heading1>{children}</Heading1>,
    "heading-2": <Heading2>{children}</Heading2>,
    "heading-3": <Heading3>{children}</Heading3>,
  };

  return componentByType[type];
};

export default Heading;
