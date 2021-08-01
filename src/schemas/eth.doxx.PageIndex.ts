const PageIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "eth.doxx.PageIndex",
  type: "object",
  properties: {
    blocks: {
      type: "array",
      title: "pages",
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

export default PageIndexSchema;
