interface Props {
  children?: React.ReactNode;
}

const PageContent = ({ children }: Props) => {
  return <div className="p-8">{children}</div>;
};

export default PageContent;
