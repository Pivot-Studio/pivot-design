import dirname from "es-dirname";
import { resolve } from 'path'
export const __dirname = dirname();

export const ComponentsPath = resolve(
  __dirname,
  "../packages/design-props/components"
);
export const ConpopnentDocsPath = resolve(
  __dirname,
  "../packages/demo/src/components"
);



