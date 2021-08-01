const BlockIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "eth.doxx.BlockIndex",
  type: "object",
  properties: {
    blocks: {
      type: "array",
      title: "blocks",
      items: { $ref: "#/definitions/CeramicId" },
    },
  },
  definitions: {
    CeramicId: {
      type: "string",
      title: "ceramicId",
      pattern: "^ceramic://.+(\\\\?version=.+)?",
      maxLength: 150,
    },
  },
};

export default BlockIndexSchema;
