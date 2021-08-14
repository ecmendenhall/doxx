import { useState } from "react";

interface ImageInputProps {
  src: string;
  labelClassName?: string;
  imgClassName?: string;
  text: string;
  name: string;
  alt: string;
  onChange: (name: string, file: File) => void;
  width?: number;
}

const ImageInput = ({
  src,
  imgClassName,
  labelClassName,
  text,
  name,
  alt,
  onChange,
  width,
}: ImageInputProps) => {
  const [file, setFile] = useState(src);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files) {
      setFile(URL.createObjectURL(files[0]));
      onChange(evt.target.name, files[0]);
    }
  };

  return (
    <div className="relative">
      <img className={imgClassName} alt={alt} src={file} width={width} />
      <label
        className={`${labelClassName} absolute bottom-6 right-6 z-50 cursor-pointer bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-lg shadow-md`}
        htmlFor={name}
      >
        {text}
        <input
          className="absolute opacity-0 w-0"
          id={name}
          name={name}
          type="file"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default ImageInput;
