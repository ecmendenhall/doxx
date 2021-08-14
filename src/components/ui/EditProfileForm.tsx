import { BasicProfile } from "@ceramicstudio/idx-constants";
import React, { useState } from "react";
import storage from "../../lib/storage";
import { Usernames } from "../../schemas";
import EmojiPicker from "./EmojiPicker";

import github from "super-tiny-icons/images/svg/github.svg";
import twitter from "super-tiny-icons/images/svg/twitter.svg";
import discord from "super-tiny-icons/images/svg/discord.svg";
import telegram from "super-tiny-icons/images/svg/telegram.svg";
import signal from "super-tiny-icons/images/svg/signal.svg";
import email from "super-tiny-icons/images/svg/email.svg";
import keybase from "super-tiny-icons/images/svg/keybase.svg";

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
    <div className="absolute bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 h-72">
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

interface UsernameInputProps {
  img: string;
  text: string;
  name: string;
  value: string;
  onChange: (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UsernameInput = ({
  img,
  text,
  name,
  value,
  onChange,
}: UsernameInputProps) => {
  return (
    <div className="mb-2 p-2">
      <label className="block font-bold" htmlFor="name">
        <img
          src={img}
          alt={`${text} logo`}
          className="w-5 mr-1 align-text-top inline"
        />{" "}
        {text}
      </label>
      <input
        className="bg-gray-50 border border-purple-200 rounded p-4 focus:bg-white focus:outline-none"
        type="text"
        id={name}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

interface FormProps {
  profile: BasicProfile;
  usernames: Usernames;
  onSubmit: (
    formData: BasicProfile,
    usernamesdata: Usernames,
    fileData: FileData
  ) => void;
}

const EditProfileForm = ({ profile, usernames, onSubmit }: FormProps) => {
  const [formData, setFormData] = useState(profile);
  const [usernamesData, setUsernamesData] = useState(usernames);
  const [fileData, setFileData] = useState({});
  const [submitState, setSubmitState] = useState("saved");

  const onUsernameChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsernamesData({
      ...usernamesData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onProfileChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onEmojiSelect = (emoji: string) => {
    setFormData({
      ...formData,
      emoji: emoji,
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
      await onSubmit(formData, usernamesData, fileData);
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
                  onChange={onProfileChange}
                />
              </div>
              <div className="mb-2 p-2">
                <label className="block font-bold" htmlFor="emoji">
                  Emoji
                </label>
                <EmojiPicker
                  emoji={formData.emoji}
                  onSelect={onEmojiSelect}
                  size="4xl"
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
                onChange={onProfileChange}
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
                  onChange={onProfileChange}
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
                  onChange={onProfileChange}
                />
              </div>
            </div>
          </form>
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
        </div>
        <div className="lg:mt-32">
          <form className="my-4">
            <div className="flex flex-col">
              <UsernameInput
                name={"github"}
                img={github}
                text={"Github"}
                value={usernamesData.github || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"twitter"}
                img={twitter}
                text={"Twitter"}
                value={usernamesData.twitter || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"discord"}
                img={discord}
                text={"Discord"}
                value={usernamesData.discord || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"telegram"}
                img={telegram}
                text={"Telegram"}
                value={usernamesData.telegram || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"signal"}
                img={signal}
                text={"Signal"}
                value={usernamesData.signal || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"email"}
                img={email}
                text={"Email"}
                value={usernamesData.email || ""}
                onChange={onUsernameChange}
              />
              <UsernameInput
                name={"keybase"}
                img={keybase}
                text={"Keybase"}
                value={usernamesData.keybase || ""}
                onChange={onUsernameChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
