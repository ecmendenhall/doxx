interface Props {
  children?: React.ReactNode;
}

const Editor = ({ children }: Props) => {
  return <div className="p-8 col-span-3">{children}</div>;
};

export default Editor;
