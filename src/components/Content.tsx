interface Props {
  children: React.ReactNode;
}

const Content = ({ children }: Props) => {
  return (
    <div className="col-span-6 lg:col-span-5">
      <div className="h-screen grid grid-cols-3 grid-rows-3">{children}</div>
    </div>
  );
};

export default Content;
