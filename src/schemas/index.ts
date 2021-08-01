import BlockSchema from "./eth.doxx.Block";
import BlockIndexSchema from "./eth.doxx.BlockIndex";

export type Schema = typeof BlockSchema | typeof BlockIndexSchema;
