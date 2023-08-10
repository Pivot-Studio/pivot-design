const prettier = require('prettier');
function format(code) {
  return prettier.format(code, {
    parser: 'babel',
    semi: true,
    singleQuote: true,
    printWidth: 120,
  });
}

// 自动引入声明，注意要空一行
function improtAll(componentsList, sourceCode) {
  return `${componentsList}

${sourceCode.trim()}`;
}

// 添加引入声明
function addImprotComponent(name, preList) {
  return `import  ${name}Code  from './demo/${name}.tsx?code';
import  ${name}  from './demo/${name}.tsx';
${preList}`;
}

function getDemo(name, component) {
  return format(`import { ${name} } from 'pivot-design';
  import React from 'react';
  const App: React.FC = () => (
    <>
      ${component.trim()}
    </>
  );
  export default App;`);
}
module.exports = function loader(source) {
  const sourceCode = source.trim();
  let newSource = sourceCode;
  const CodeBlockReg = /<CodeBlock(.*)>([\n\r\s\S]*?)<\/CodeBlock>/g;
  const H1Reg = /# (\w+)/;
  // eslint-disable-next-line prefer-destructuring
  const component = H1Reg.exec(sourceCode)[1];
  let m;
  let importComponentsList = '';
  while ((m = CodeBlockReg.exec(newSource))) {
    if (m[1].includes('code')) continue; // 如果本来就有code属性，使用code
    const headSource = newSource.slice(0, m.index);
    let restSource = newSource.slice(m.index);

    if (!m[2].match(/<.*>/gi)) {
      // 没有合法的标签元素，直接跳过
      continue;
    }
    // 根据>的出现次数，判断是否自动导入，只出现一次>，自动引入闭合标签内的元素，元素名需要和demo中的文件名相同
    const isImport = m[2].match(/>/gi).length === 1;

    // 获取需要引入的组件名，自动匹配demo文件夹中组件
    // 如 <demo />
    const importName = isImport
      ? m[2]
          .match(/<([\s\S]*?)\/>/g)[0]
          .slice(1, -2)
          .trim()
      : null;

    if (isImport) {
      importComponentsList = addImprotComponent(importName, importComponentsList);
    }

    if (m[1]) {
      const addStr = isImport ? m[1] + ` code={${importName}Code}` : m[1] + ` code={\`${getDemo(component, m[2])}\`}`;
      restSource = restSource.replace(m[1], addStr);
      CodeBlockReg.lastIndex = m.index + addStr.length;
    } else {
      // 解决当m[1]=''的时候无法replace的问题
      const addStr = isImport ? ` code={${importName}Code}` : ` code={\`${getDemo(component, m[2])}\`}`;
      restSource = restSource.slice(0, 10) + addStr + restSource.slice(10);
      CodeBlockReg.lastIndex = headSource.length + m[0].length + addStr.length;
    }
    newSource = headSource + restSource;
  }
  const result = improtAll(importComponentsList, newSource);
  return result;
};
