import { useState } from "react";
import { Rnd, RndResizeCallback } from "react-rnd";

export interface Dimensions {
  width: number;
  height: number;
}

interface ResizableContainerProps {
  width?: number;
  onResize?: (dimensions: Dimensions) => void;
  onResizeStop?: (dimensions: Dimensions) => void;
  children: React.ReactNode;
  className: string;
  enabled: boolean;
}

interface ImageInputProps {
  src: string;
  labelClassName?: string;
  imgClassName?: string;
  text: string;
  name: string;
  alt: string;
  width?: number;
  resizable: boolean;
  onChange: (name: string, file: File) => void;
  onResize?: (dimensions: Dimensions) => void;
  onResizeStop?: (dimensions: Dimensions) => void;
}

const ResizableContainer = ({
  width,
  onResize,
  onResizeStop,
  children,
  className,
  enabled,
}: ResizableContainerProps) => {
  const handleResize: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    if (onResize) {
      onResize({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    }
  };

  const handleResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    if (onResizeStop) {
      onResizeStop({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      });
    }
  };
  if (enabled) {
    return (
      <Rnd
        default={{ width: width || 100, height: "auto", x: 0, y: 0 }}
        onResize={handleResize}
        onResizeStop={handleResizeStop}
        enableResizing={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        lockAspectRatio
        disableDragging
        className={`bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50`}
      >
        {children}
      </Rnd>
    );
  } else {
    return <div>{children}</div>;
  }
};

const ImageInput = ({
  src,
  imgClassName,
  labelClassName,
  text,
  name,
  alt,
  width,
  resizable,
  onChange,
  onResize,
  onResizeStop,
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
    <ResizableContainer
      enabled={resizable}
      className={`bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50`}
      width={width}
      onResize={onResize}
      onResizeStop={onResizeStop}
    >
      <img className={imgClassName} alt={alt} src={file} />
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
    </ResizableContainer>
  );
};

export default ImageInput;
