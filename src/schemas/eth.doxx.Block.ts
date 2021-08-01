const BlockSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "eth.doxx.Block",
  type: "object",
  properties: {
    type: {
      type: "string",
      title: "type",
    },
    properties: {
      type: "object",
      title: "properties",
    },
    content: {
      type: "array",
      title: "content",
      items: { $ref: "#/definitions/CeramicId" },
    },
    format: {
      type: "object",
      title: "format",
    },
    parent: { $ref: "#/definitions/OptionalCeramicId" },
  },
  definitions: {
    OptionalCeramicId: {
      type: "string",
      title: "OptionalCeramicId",
      pattern: "^$|(^ceramic://.+(\\\\?version=.+)?)",
      maxLength: 150,
    },
    CeramicId: {
      type: "string",
      title: "ceramicId",
      pattern: "^ceramic://.+(\\\\?version=.+)?",
      maxLength: 150,
    },
  },
};

export default BlockSchema;
