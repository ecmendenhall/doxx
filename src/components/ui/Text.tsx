interface Props {
  children: React.ReactNode;
}

const Text = ({ children }: Props) => {
  return (
    <div className="leading-8">
      <p>{children}</p>
    </div>
  );
};

export default Text;
