import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { parse } from '@babel/parser';
import { declare } from '@babel/helper-plugin-utils';
import { transformFromAstSync } from '@babel/core';

const curDir = path.dirname(fileURLToPath(import.meta.url));

function getPivotDesignProps() {
  return getProps(path.join(curDir, '../../design-props/components/index.ts'));
}

function parseComment(commentStr: string) {
  let props = {};
  if (!commentStr) {
    return props;
  }
  const COMMENT_REG = /@(\w+)\s+(.+)/g;
  for (const prop of commentStr.matchAll(COMMENT_REG)) {
    const [, key, val] = prop;
    props[key] = val;
  }
  return props;
}

let props = {};
const generatorPropsPlugin = declare((api, options) => {
  api.assertVersion(7);
  return {
    pre: (file) => {
      // 用于存储props对象Array<{...}>
      file.docs = new Map();
    },
    visitor: {
      TSInterfaceDeclaration: (path, state) => {
        const { name } = path.id;
        const extendsVal = path.node.extends;
        extendsVal?.forEach((item) => {
          if (item.expression.name === 'PivotDesignProps') {
            const props = getPivotDesignProps();
            state.file.docs.push(...props);
          }
        });
        path.traverse({
          TSPropertySignature: (p) => {
            const key = p.get('key').toString();
            const value = p.get('typeAnnotation').toString();
            const optional = p.get('optional').node;
            const commentStr = p.get('leadingComments').length > 0 && p.get('leadingComments')[0].node.value;
            const comments = parseComment(commentStr);
            if (!file.docs.has(name)) {
              file.docs.set(name, {});
            } else {
              const props = file.docs.get(name);
              props.push({ key, value, optional, ...comments });
              file.docs.set(name, props);
            }
          },
        });
        // }
      },
    },
    post(file) {
      if (options.name === 'index') return;
      // todo:create md table 使用自己的自定义组件吧
      props = file.docs;
    },
  };
});

function getProps(path: string) {
  if (!existsSync(path)) {
    throw `<API />设置的props所在路径${path}不存在`;
  }
  const sourceCode = readFileSync(path, { encoding: 'utf-8' });
  const ast = parse(sourceCode, {
    // 不确定是module还是es6写法
    sourceType: 'unambiguous',
    plugins: ['typescript'],
  });
  // 该函数返回值是代码，所以只好在plugin的post部分修改了props值
  transformFromAstSync(ast, sourceCode, {
    plugins: [[generatorPropsPlugin]],
  });
  return props;
}

function loader(source: string) {
  const sourceCode = source.trim();

  const apiBlockReg = /<Api\s+path=(["'])([^"']+)\1(><\/Api>|\s+\/>)/g;

  const matchValArr = sourceCode.matchAll(apiBlockReg);
  const propsList: any[] = [];
  if (matchValArr) {
    for (let matchVal of matchValArr) {
      let [, , pathVal] = matchVal;
      pathVal = path.join(curDir, '../../design-props', pathVal);
      const props = getProps(pathVal);
      propsList.push(props);
    }
  }
  propsList.forEach((props) => {
    for (const key of Object.keys(props)) {
      console.log(key);
      console.log(props[key]);
    }
  });
  return propsList;
}

export default loader;

const source = readFileSync(path.join(curDir, '../src/components/Button/index.mdx'));
const sourceCode = source.toString('utf-8').trim();
loader(sourceCode);
