interface Props {
  children: React.ReactNode;
}

const Grid = ({ children }: Props) => {
  return (
    <div className="container">
      <div className="h-screen grid grid-cols-6">{children}</div>
    </div>
  );
};

export default Grid;
