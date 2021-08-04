interface Props {
  children: React.ReactNode;
}

const Text = ({ children }: Props) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

export default Text;
