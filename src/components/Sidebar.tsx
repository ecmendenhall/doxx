interface Props {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="col-span-1 bg-purple-100 hidden lg:block relative">
      <h1 className="font-script text-4xl p-4 mt-2 border-purple-200 border-b-2">
        📑 Doxx
      </h1>
      {children}
    </div>
  );
};

export default Sidebar;
