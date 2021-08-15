import { BasicProfile } from "@ceramicstudio/idx-constants";
import { Usernames } from "../../schemas";
import storage from "../../lib/storage";

import githubIcon from "super-tiny-icons/images/svg/github.svg";
import twitterIcon from "super-tiny-icons/images/svg/twitter.svg";
import discordIcon from "super-tiny-icons/images/svg/discord.svg";
import telegramIcon from "super-tiny-icons/images/svg/telegram.svg";
import signalIcon from "super-tiny-icons/images/svg/signal.svg";
import emailIcon from "super-tiny-icons/images/svg/email.svg";
import keybaseIcon from "super-tiny-icons/images/svg/keybase.svg";
import { ENSRecords } from "../../lib/ens";
import FallbackImage from "./FallbackImage";

interface Props {
  profile: BasicProfile;
  usernames: Usernames;
  ensRecords: ENSRecords;
  address: string;
  ensName: string | null;
  verified: boolean;
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

const Profile = ({
  profile,
  usernames,
  ensName,
  address,
  ensRecords,
  verified,
}: Props) => {
  const avatar =
    storage.gatewayUrl(profile.image?.original.src) || ensRecords.avatar;
  const name = profile.name || ensRecords.display;
  const description = profile.description || ensRecords.description;
  const location = profile.homeLocation || ensRecords.location;
  const url = profile.url || ensRecords.url;
  const email = usernames.email || ensRecords.email;
  const github =
    usernames.github || ensRecords["com.github"] || ensRecords["vnd.github"];
  const twitter =
    usernames.twitter || ensRecords["com.twitter"] || ensRecords["vnd.twitter"];
  const telegram = usernames.telegram || ensRecords["org.telegram"];
  const keybase = usernames.keybase || ensRecords["io.keybase"];

  return (
    <div className="col-span-3">
      <div className="absolute w-full bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 h-72">
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
            {avatar && (
              <FallbackImage
                className="shadow-md rounded-lg w-36 h-36 bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50 object-center object-cover"
                src={avatar}
                fallback="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                alt="Profile"
              />
            )}
            {!avatar && profile.emoji && (
              <span className="text-8xl px-3 py-2 bg-gray-50 rounded-lg shadow-md">
                {profile.emoji}
              </span>
            )}
            {!avatar && !profile.emoji && (
              <div className="shadow-md rounded-lg w-36 h-36 bg-gradient-to-tr from-blue-200 via-purple-200 to-purple-50"></div>
            )}
          </div>
          <div className="mb-2 p-2">
            <h1 className="text-3xl font-bold">
              {name} {avatar && profile.emoji}
            </h1>
            <div>
              <span className="group">
                <pre className="inline">{ensName || address}</pre>
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
                {verified && (
                  <a
                    href={`https://app.proofofhumanity.id/profile/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 align-top inline"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </span>
            </div>
          </div>
          <div className="mb-2 p-2 max-w-prose">
            <div>{description}</div>
          </div>
          <div className="mb-2 p-2">
            {location && (
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
                {location}
              </span>
            )}
            {url && (
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
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="lg:mt-36 mt-4">
            {twitter && (
              <SocialLink
                name={"Twitter"}
                img={twitterIcon}
                username={twitter}
                url={`https://twitter.com/${twitter}`}
              />
            )}
            {github && (
              <SocialLink
                name={"Github"}
                img={githubIcon}
                username={github}
                url={`https://github.com/${github}`}
              />
            )}
            {usernames.discord && (
              <SocialLink
                name={"Discord"}
                img={discordIcon}
                username={usernames.discord}
              />
            )}
            {telegram && (
              <SocialLink
                name={"Telegram"}
                img={telegramIcon}
                username={telegram}
                url={`https://t.me/${telegram}`}
              />
            )}
            {usernames.signal && (
              <SocialLink
                name={"Signal"}
                img={signalIcon}
                username={usernames.signal}
              />
            )}
            {email && (
              <SocialLink name={"Email"} img={emailIcon} username={email} />
            )}
            {usernames.keybase && (
              <SocialLink
                name={"Keybase"}
                img={keybaseIcon}
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
