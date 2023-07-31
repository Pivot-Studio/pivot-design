export interface Param {
  key: string;
  value: string;
  optional: boolean;
  version: string;
  description: string;
  default: string;
}

export type Params = Param[];

export type ParamsMap = Map<string, Params>;
