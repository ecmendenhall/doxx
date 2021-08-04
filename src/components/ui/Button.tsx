interface Props {
  onClick: () => void;
  primary: boolean;
  children: React.ReactNode;
}

const Button = ({ onClick, primary, children }: Props) => {
  if (primary) {
    return (
      <button
        onClick={onClick}
        className="bg-purple-100 hover:bg-purple-300 py-1 px-2 rounded-lg shadow-md"
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-lg shadow-md"
      >
        {children}
      </button>
    );
  }
};

export default Button;
