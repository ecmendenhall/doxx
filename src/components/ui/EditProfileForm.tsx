import { BasicProfile } from "@ceramicstudio/idx-constants";
import React, { useState } from "react";
import storage from "../../lib/storage";

interface Props {
  profile: BasicProfile;
  onChange: (name: string, file: File) => void;
}

interface ImageInputProps {
  src: string;
  labelClassName?: string;
  imgClassName?: string;
  text: string;
  name: string;
  alt: string;
  onChange: (name: string, file: File) => void;
}

const ImageInput = ({
  src,
  imgClassName,
  labelClassName,
  text,
  name,
  alt,
  onChange,
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
    <div>
      <img className={imgClassName} alt={alt} src={file} />
      <label
        className={`${labelClassName} z-50 cursor-pointer bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-lg shadow-md`}
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

const CoverImage = ({ profile, onChange }: Props) => {
  return (
    <div className="absolute bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 w-screen h-72">
      <ImageInput
        imgClassName="object-cover object-center w-screen h-72 shadow-sm"
        labelClassName="fixed right-4 top-60"
        src={
          storage.gatewayUrl(profile.background?.original.src) ||
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        }
        text="Cover photo"
        name="background"
        onChange={onChange}
        alt="Cover"
      />
    </div>
  );
};

const ImageSelect = ({ profile, onChange }: Props) => {
  return (
    <div className="mb-2 p-2">
      <ImageInput
        imgClassName="shadow-md rounded-lg w-36 h-36 object-cover object-center bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50"
        labelClassName="relative bottom-2 left-4"
        src={
          storage.gatewayUrl(profile.image?.original.src) ||
          "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        }
        text="Profile"
        name="image"
        onChange={onChange}
        alt="Profile photo"
      />
    </div>
  );
};

export interface FileData {
  image?: File;
  background?: File;
}

interface FormProps {
  profile: BasicProfile;
  onSubmit: (formData: BasicProfile, fileData: FileData) => void;
}

const EditProfileForm = ({ profile, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState(profile);
  const [fileData, setFileData] = useState({});
  const [submitState, setSubmitState] = useState("saved");

  const onChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onFileChange = (name: string, file: File) => {
    setFileData({
      ...fileData,
      [name]: file,
    });
  };

  const handleSubmit = (evt: React.MouseEvent) => {
    const handle = async () => {
      setSubmitState("saving");
      await onSubmit(formData, fileData);
      setSubmitState("saved");
    };
    evt.preventDefault();
    handle();
  };

  return (
    <div className="col-span-3">
      <CoverImage profile={profile} onChange={onFileChange} />
      <div className="p-12 top-36 relative flex lg:flex-row lg:justify-evenly flex-col ">
        <div>
          <ImageSelect profile={profile} onChange={onFileChange} />
          <form className="my-4">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="mb-2 p-2">
                <label className="block font-bold" htmlFor="name">
                  Name
                </label>
                <input
                  className="bg-gray-50 border border-purple-200 rounded p-4 focus:bg-white focus:outline-none"
                  type="text"
                  id="name"
                  autoComplete="off"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2 p-2">
                <label className="block font-bold" htmlFor="emoji">
                  Emoji
                </label>
                <input
                  className="w-16 bg-gray-50 border border-purple-200 p-4 rounded focus:bg-white focus:outline-none"
                  type="text"
                  id="emoji"
                  autoComplete="off"
                  name="emoji"
                  value={formData.emoji}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="mb-2 p-2">
              <label className="block font-bold" htmlFor="description">
                Description
              </label>
              <textarea
                className="bg-gray-50 border border-purple-200 rounded p-4 focus:bg-white focus:outline-none"
                cols={40}
                id="description"
                autoComplete="off"
                name="description"
                value={formData.description}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="mb-2 p-2">
                <label className="block font-bold" htmlFor="location">
                  Location
                </label>
                <input
                  className="bg-gray-50 border border-purple-200 rounded p-4 focus:bg-white focus:outline-none"
                  type="text"
                  id="location"
                  autoComplete="off"
                  name="homeLocation"
                  value={formData.homeLocation}
                  onChange={onChange}
                />
              </div>
              <div className="mb-2 p-2">
                <label className="block font-bold" htmlFor="url">
                  URL
                </label>
                <input
                  className="w-64 bg-gray-50 border border-purple-200 rounded p-4 focus:bg-white focus:outline-none"
                  type="text"
                  id="url"
                  autoComplete="off"
                  name="url"
                  value={formData.url}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="my-4">
              <button
                onClick={handleSubmit}
                className="font-bold bg-gray-100 hover:bg-gray-300 p-4 rounded-lg shadow-md"
                disabled={submitState === "saving"}
              >
                {submitState === "saved" && "Save Profile"}
                {submitState === "saving" && "Saving..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
