import { useState } from "react";

interface Props {
  className: string;
  src: string;
  alt: string;
  fallback: string;
}

const FallbackImage = ({ src, className, alt, fallback }: Props) => {
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    setImgSrc(fallback);
  };

  return <img className={className} src={imgSrc} alt={alt} onError={onError} />;
};

export default FallbackImage;
