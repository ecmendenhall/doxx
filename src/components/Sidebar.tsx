interface Props {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="col-span-1 bg-purple-100 hidden lg:block relative">
      <h1 className="text-2xl py-1 px-4 my-4">Doxx</h1>
      {children}
    </div>
  );
};

export default Sidebar;
