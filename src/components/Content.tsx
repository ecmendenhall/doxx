interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return <div className="col-span-5">{children}</div>;
};

export default Content;
