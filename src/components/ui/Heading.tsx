interface Props {
  children: React.ReactNode;
}

const Heading = ({ children }: Props) => {
  return <h2 className="text-3xl font-bold">{children}</h2>;
};

export default Heading;
