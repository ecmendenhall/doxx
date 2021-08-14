interface Props {
  emoji?: string;
  hover: boolean;
  onClick?: () => void;
  size: string;
}

export const EmojiHero = ({ emoji, hover, onClick, size }: Props) => {
  const className = hover ? "cursor-pointer rounded-lg hover:bg-gray-100" : "";

  return (
    <div onClick={onClick} className={`text-${size} my-4 p-2`}>
      <span className={className}>{emoji}</span>
    </div>
  );
};
