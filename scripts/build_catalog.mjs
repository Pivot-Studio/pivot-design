import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { resolve, extname } from 'path'
import { ConpopnentDocsPath, __dirname } from './env.mjs';

const isH2 = (text) => text.startsWith('##')
const isH3 = (text) => text.startsWith('###')

const isValidComponentDir = (dir) => {
  if (typeof dir !== 'string') return false
  return dir.charAt(0) >= 'A' && dir.charAt(0) <= 'Z'
}

const components = readdirSync(ConpopnentDocsPath).filter((dir) => !extname(dir) && isValidComponentDir(dir));

for (let component of components) {
  const componentPath = resolve(ConpopnentDocsPath, component);

  const text = readFileSync(resolve(componentPath, './index.mdx'), {
    encoding: 'utf-8'
  });

  // {h2:string,h3:[]}[]
  const list = []
  const titleReg = /#{2,3}\s(\S+)/g

  let m;

  while ((m = titleReg.exec(text))) {
    const isInner = isH3(m[0])
    const content = m[1];

    if (!isInner) {
      list.push({ h2: content, h3: [] })
    } else {
      list.at(-1).h3.push(content)
    }
  }
  const CatalogPath = resolve(componentPath, `./.catalog.ts`)
  writeFileSync(CatalogPath, `export const list = ${JSON.stringify(list)}`)
}





