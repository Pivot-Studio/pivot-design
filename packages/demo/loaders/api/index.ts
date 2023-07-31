import { existsSync, readFileSync } from 'fs';
import { parse } from '@babel/parser';
import { declare } from '@babel/helper-plugin-utils';
import { transformFromAstSync, traverse } from '@babel/core';
import { ParamsMap } from './type';
import { join, resolve } from 'path';

// const curDir = path.dirname(fileURLToPath(import.meta.url));
const curDir = __dirname;

function getPivotDesignProps() {
  return getProps(resolve(curDir, '../../../design-props/components/index.ts'));
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
  let returnProps = new Map();
  // 该函数返回值是代码，所以只好在plugin的post部分修改了props值
  traverse(ast, {
    TSInterfaceDeclaration: (path) => {
      const { name } = path.node.id;
      const extendsVal = path.node.extends;
      if (!returnProps.has(name)) {
        returnProps.set(name, []);
      }
      extendsVal?.forEach((item) => {
        if (item.expression.name === 'PivotDesignProps') {
          const props = getPivotDesignProps().get('PivotDesignProps');
          returnProps.set(name, props);
        }
      });
      path.traverse({
        TSPropertySignature: (p) => {
          if (p.parentKey === 'members') return;
          const key = p.get('key').toString();
          const value = p.get('typeAnnotation').toString();
          const optional = p.get('optional').node;
          const commentStr = p.get('leadingComments').length > 0 && p.get('leadingComments')[0].node.value;
          const comments = parseComment(commentStr);
          let props = returnProps.get(name);
          const newProps = { key, value, optional, ...comments };
          props.push(newProps);
          returnProps.set(name, props);
        },
      });
    },
  });
  return returnProps;
}

function getPropsNode(props: ParamsMap) {
  let node = '';
  for (const key of props.keys()) {
    const val = props.get(key);
    node += `<Props name=${key} props=${val}></Props>`;
  }
  return node;
}

function loader(source: string) {
  let sourceCode = source.trim();

  const apiBlockReg = /<Api\s+path=(["'])([^"']+)\1(><\/Api>|\s+\/>)/g;

  const matchValArr = sourceCode.matchAll(apiBlockReg);
  const arr = Array.from(matchValArr);
  console.log('arr', '\n\n\n\n');
  console.dir(arr);
  if (arr.length) {
    console.log(matchValArr);
    for (let matchVal of matchValArr) {
      console.log('matchVal', matchVal);
      let [initialVal, , pathVal] = matchVal;
      pathVal = join(curDir, '../../../design-props', pathVal);
      const props = getProps(pathVal);
      const propsNode = getPropsNode(props);
      sourceCode = sourceCode.replace(initialVal, propsNode);
    }
    // 添加ApiTable的import\
    sourceCode = 'import Api from "@/ApiTable.tsx"\n' + sourceCode;
    console.log(sourceCode);
  }

  return sourceCode;
}

export default loader;
