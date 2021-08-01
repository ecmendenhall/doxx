import { writeFileSync } from "fs";
import ceramic from "../src/lib/ceramic";
import BlockSchema from "../src/schemas/eth.doxx.Block";
import BlockIndexSchema from "../src/schemas/eth.doxx.BlockIndex";
import PageIndexSchema from "../src/schemas/eth.doxx.PageIndex";

const run = async () => {
  const client = await ceramic.loadClient();
  await ceramic.authenticateApp(
    "90c5bbfa6066cc2ef348941c7a08f15763aad587dc433fe96b9eb8ac56881924"
  );
  const blockSchema = await ceramic.publishSchema(client, BlockSchema);
  const blockIndexSchema = await ceramic.publishSchema(
    client,
    BlockIndexSchema
  );
  const blocksDefinition = await ceramic.publishDefinition(
    client,
    "eth.doxx.blocks",
    "Content blocks",
    blockIndexSchema
  );
  const pagesIndexSchema = await ceramic.publishSchema(client, PageIndexSchema);
  const pagesDefinition = await ceramic.publishDefinition(
    client,
    "eth.doxx.pages",
    "Pages",
    pagesIndexSchema
  );
  const config = {
    definitions: {
      blocks: blocksDefinition.id.toString(),
      pages: pagesDefinition.id.toString(),
    },
    schemas: {
      Block: blockSchema.commitId.toUrl(),
      BlockIndex: blockIndexSchema.commitId.toUrl(),
      PageIndex: pagesIndexSchema.commitId.toUrl(),
    },
  };
  writeFileSync("./src/config/deployedSchemas.json", JSON.stringify(config));
  console.log(config);
};

run().catch(console.error);
