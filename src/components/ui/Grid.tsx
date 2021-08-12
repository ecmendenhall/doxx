interface Props {
  children: React.ReactNode;
}

const Grid = ({ children }: Props) => {
  return (
    <div className="container">
      <div className="h-screen w-screen grid grid-cols-6 overflow-y-auto flex">
        {children}
      </div>
    </div>
  );
};

export default Grid;
