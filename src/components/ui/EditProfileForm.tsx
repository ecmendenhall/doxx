import { BasicProfile } from "@ceramicstudio/idx-constants";
import { SelectionState } from "draft-js";
import React, { useState } from "react";
import Button from "./Button";

interface Props {
  profile: BasicProfile;
}

const CoverImage = ({ profile }: Props) => {
  return (
    <div className="absolute bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 w-screen h-72">
      {profile.background && (
        <img
          className="object-cover object-center w-screen h-72 shadow-sm"
          src={
            "https://ipfs.io/ipfs/QmZD41nhZgcN7WTodubWyM1DLQkSCEF5FsZX1izXBxxgAn"
          }
        />
      )}
    </div>
  );
};

const ImageSelect = ({ profile }: Props) => {
  return (
    <div className="mb-2 p-2">
      {profile.image ? (
        <img
          className="shadow-md rounded-lg"
          src={"https://www.fillmurray.com/150/150"}
        />
      ) : (
        <span className="text-8xl px-3 py-2 bg-gray-50 rounded-lg shadow-md">
          {profile.emoji}
        </span>
      )}
    </div>
  );
};

const ProfileInfoForm = ({ profile }: Props) => {
  const [formData, setFormData] = useState(profile);

  const onChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
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
        <button className="font-bold bg-gray-100 hover:bg-gray-300 p-4 rounded-lg shadow-md">
          Save Profile
        </button>
      </div>
    </form>
  );
};

const EditProfileForm = ({ profile }: Props) => {
  return (
    <div className="col-span-3">
      <CoverImage profile={profile} />
      <div className="p-12 top-36 relative flex lg:flex-row lg:justify-evenly flex-col ">
        <div>
          <ImageSelect profile={profile} />
          <ProfileInfoForm profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
