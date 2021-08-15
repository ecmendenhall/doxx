interface Props {
  src: string;
  text: string;
  name: string;
  labelClassName?: string;
  onChange: (name: string, file: File) => void;
}

const FileInput = ({ src, text, name, labelClassName, onChange }: Props) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files) {
      onChange(evt.target.name, files[0]);
    }
  };

  return (
    <div>
      <label className={`${labelClassName || ""} flex-grow`} htmlFor={name}>
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

export default FileInput;
