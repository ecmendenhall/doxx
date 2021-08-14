import { BasicProfile } from "@ceramicstudio/idx-constants";
import { Usernames } from "../../schemas";
import storage from "../../lib/storage";

import github from "super-tiny-icons/images/svg/github.svg";
import twitter from "super-tiny-icons/images/svg/twitter.svg";
import discord from "super-tiny-icons/images/svg/discord.svg";
import telegram from "super-tiny-icons/images/svg/telegram.svg";
import signal from "super-tiny-icons/images/svg/signal.svg";
import email from "super-tiny-icons/images/svg/email.svg";
import keybase from "super-tiny-icons/images/svg/keybase.svg";

interface Props {
  profile: BasicProfile;
  usernames: Usernames;
  address: string;
  name: string | null;
}

interface SocialLinkProps {
  img: string;
  name: string;
  url?: string;
  username: string;
}

const SocialLink = ({ img, name, url, username }: SocialLinkProps) => {
  return (
    <div className="mb-2">
      <span className="p-2">
        <img
          src={img}
          alt={`${name} logo`}
          className="w-5 mr-1 align-text-top inline"
        />
        {url ? (
          <a href={url} target="_blank" rel="noreferrer">
            {username}
          </a>
        ) : (
          username
        )}
      </span>
    </div>
  );
};

const Profile = ({ profile, usernames, name, address }: Props) => {
  return (
    <div className="col-span-3">
      <div className="absolute bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 h-72">
        {profile.background && (
          <img
            className="object-cover object-center w-screen h-72 shadow-sm"
            src={storage.gatewayUrl(profile.background.original.src)}
            alt="Cover"
          />
        )}
      </div>
      <div className="p-12 top-36 relative flex lg:flex-row lg:justify-evenly flex-col ">
        <div>
          <div className="mb-2 p-2">
            {profile.image ? (
              <img
                className="shadow-md rounded-lg w-36 h-36 object-center object-cover"
                src={storage.gatewayUrl(profile.image.original.src)}
                alt="Profile"
              />
            ) : (
              <span className="text-8xl px-3 py-2 bg-gray-50 rounded-lg shadow-md">
                {profile.emoji}
              </span>
            )}
          </div>
          <div className="mb-2 p-2">
            <h1 className="text-3xl font-bold">
              {profile.name} {profile.image && profile.emoji}
            </h1>
            <div>
              <span className="group">
                <pre className="inline">{name || address}</pre>
                <a
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2 align-top inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div className="mb-2 p-2 max-w-prose">
            <div>{profile.description}</div>
          </div>
          <div className="mb-2 p-2">
            {profile.homeLocation && (
              <span className="mr-2 bg-gray-100 p-2 rounded-lg shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1 align-top inline text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {profile.homeLocation}
              </span>
            )}
            {profile.url && (
              <span className="mr-2 bg-gray-100 p-2 rounded-lg shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1 align-top inline text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <a href={profile.url} target="_blank" rel="noreferrer">
                  {profile.url}
                </a>
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="lg:mt-36 mt-4">
            {usernames.twitter && (
              <SocialLink
                name={"Twitter"}
                img={twitter}
                username={usernames.twitter}
                url={`https://twitter.com/${usernames.twitter}`}
              />
            )}
            {usernames.github && (
              <SocialLink
                name={"Github"}
                img={github}
                username={usernames.github}
                url={`https://github.com/${usernames.github}`}
              />
            )}
            {usernames.discord && (
              <SocialLink
                name={"Discord"}
                img={discord}
                username={usernames.discord}
              />
            )}
            {usernames.telegram && (
              <SocialLink
                name={"Telegram"}
                img={telegram}
                username={usernames.telegram}
                url={`https://t.me/${usernames.telegram}`}
              />
            )}
            {usernames.signal && (
              <SocialLink
                name={"Signal"}
                img={signal}
                username={usernames.signal}
              />
            )}
            {usernames.email && (
              <SocialLink
                name={"Email"}
                img={email}
                username={usernames.email}
              />
            )}
            {usernames.keybase && (
              <SocialLink
                name={"Keybase"}
                img={keybase}
                username={usernames.keybase}
                url={`https://keybase.io/${usernames.keybase}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
