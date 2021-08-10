import { Link } from "react-router-dom";
import { formatAddress } from ".";

interface AuthorProps {
  name?: string;
  address?: string;
}

interface AuthorInfoProps {
  fullName: string;
  displayName: string;
}

const AuthorInfo = ({ fullName, displayName }: AuthorInfoProps) => {
  return (
    <Link to={`/${fullName}`}>
      <span className="bg-gray-100 hover:bg-gray-200 cursor-pointer py-1 px-2 rounded-lg shadow-sm">
        {displayName}
      </span>
    </Link>
  );
};

const Author = ({ name, address }: AuthorProps) => {
  if (name) {
    return <AuthorInfo fullName={name} displayName={name} />;
  } else if (address) {
    return (
      <AuthorInfo fullName={address} displayName={formatAddress(address)} />
    );
  } else {
    return <></>;
  }
};

export default Author;
