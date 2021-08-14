const UsernamesSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "eth.doxx.Usernames",
  type: "object",
  properties: {
    twitter: {
      type: "string",
      title: "twitter",
    },
    github: {
      type: "string",
      title: "github",
    },
    discord: {
      type: "string",
      title: "discord",
    },
    telegram: {
      type: "string",
      title: "telegram",
    },
    signal: {
      type: "string",
      title: "signal",
    },
    email: {
      type: "string",
      title: "email",
    },
    keybase: {
      type: "string",
      title: "keybase",
    },
  },
  definitions: {},
};

export default UsernamesSchema;
