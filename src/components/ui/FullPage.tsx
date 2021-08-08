interface Props {
  children: React.ReactNode;
}

const FullPage = ({ children }: Props) => {
  return (
    <div className="col-span-6 overflow-y-scroll">
      <div className="h-screen p-16">{children}</div>
    </div>
  );
};

export default FullPage;
