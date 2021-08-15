interface Props {
  children: React.ReactNode;
}

const FullPage = ({ children }: Props) => {
  return (
    <div className="col-span-6">
      <div className="h-screen lg:px-32 md:px-16 px-8 py-16 max-w-screen-xl">
        {children}
      </div>
    </div>
  );
};

export default FullPage;
