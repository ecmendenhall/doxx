import { InfuraProvider, Web3Provider } from "@ethersproject/providers";

const ENS_TXT_RECORDS = [
  "avatar",
  "description",
  "display",
  "email",
  "keywords",
  "mail",
  "notice",
  "location",
  "phone",
  "url",
  "com.github",
  "com.twitter",
  "io.keybase",
  "org.telegram",
  "vnd.github",
  "vnd.twitter",
];

export interface ENSRecords {
  avatar?: string;
  description?: string;
  display?: string;
  email?: string;
  keywords?: string;
  mail?: string;
  notice?: string;
  location?: string;
  phone?: string;
  url?: string;
  "com.github"?: string;
  "com.twitter"?: string;
  "io.keybase"?: string;
  "org.telegram"?: string;
  "vnd.github"?: string;
  "vnd.twitter"?: string;
}

const getTextRecords = async (
  provider: Web3Provider | InfuraProvider,
  ensName: string
): Promise<ENSRecords> => {
  const resolver = await provider.getResolver(ensName);
  let records: ENSRecords = {};
  for (const record of ENS_TXT_RECORDS) {
    const value = await resolver.getText(record);
    if (value) {
      records = {
        ...records,
        [record]: value,
      };
    }
  }
  return records;
};

const exp = {
  getTextRecords,
};

export default exp;
