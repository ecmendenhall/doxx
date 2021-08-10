import { Link } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const Sidebar = ({ children }: Props) => {
  return (
    <div className="col-span-1 h-screen fixed top-0 sticky bg-purple-100 hidden lg:block relative">
      <Link to="/">
        <div>
          <h1 className="font-script tracking-tighter text-purple-800 text-4xl p-4 mt-2 border-purple-200 border-b-2">
            📑 Doxx
          </h1>
        </div>
      </Link>
      {children}
    </div>
  );
};

export default Sidebar;
