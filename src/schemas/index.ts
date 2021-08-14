import BlockSchema from "./eth.doxx.Block";
import BlockIndexSchema from "./eth.doxx.BlockIndex";
import UsernamesSchema from "./eth.doxx.Usernames";

export interface Usernames {
  twitter?: string;
  github?: string;
  discord?: string;
  telegram?: string;
  signal?: string;
  email?: string;
  keybase?: string;
}

export type Schema =
  | typeof BlockSchema
  | typeof BlockIndexSchema
  | typeof UsernamesSchema;
