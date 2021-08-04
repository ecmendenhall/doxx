interface Props {
  children: React.ReactNode;
}

const PageTitle = ({ children }: Props) => {
  return <h1 className="font-bold text-4xl my-4">{children}</h1>;
};

export default PageTitle;
