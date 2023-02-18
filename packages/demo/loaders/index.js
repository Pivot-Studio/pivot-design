const prettier = require('prettier');
function format(code) {
  return prettier.format(code, {
    semi: true,
    singleQuote: true,
    printWidth: 120,
  });
}

// 自动添加引入声明，注意要空一行
function improtAll(componentsList, sourceCode) {
  return `${componentsList}

${sourceCode.trim()}`;
}

// 自动添加引入声明，注意要空一行
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
  while ((m = CodeBlockReg.exec(sourceCode))) {
    if (m[1].includes('code')) continue; // 如果本来就有code属性，使用code
    const headSource = newSource.slice(0, m.index);
    let restSource = newSource.slice(m.index);

    console.log('/////////////////restSource');
    console.log(restSource);

    // 根据>的出现次数，判断是否自动导入，只出现一次>，自动引入闭合标签内的元素，元素名需要和demo中的文件名相同
    const isImport = m[2].match(eval('/>/ig')).length === 1;
    // const importName = isImport ? /<([\s\S]*?)\/>/.exec(m[2])[1] : null;

    //好像是每次匹配中间的正则，就会改变下一次m的取值？？？
    const importName = isImport ? m[2].match(/<([\s\S]*?)\/>/g)[0].slice(1, -2) : null;

    if (isImport) {
      importComponentsList = addImprotComponent(importName, importComponentsList);
    }
    console.log('/////////////////importName');
    console.log(importName, isImport);
    console.log('/////////////////m[1]');
    console.log(m[1]);
    console.log('/////////////////m[2]');
    console.log(m[2]);
    console.log('/////////////////finish');
    console.log('/////////////////finish');
    console.log('/////////////////finish');

    if (m[1]) {
      isImport
        ? (restSource = restSource.replace(m[1], m[1] + ` code={${importName}Code}`))
        : (restSource = restSource.replace(m[1], m[1] + ` code={\`${getDemo(component, m[2])}\`}`));
    } else {
      // 解决当m[1]=''的时候无法replace的问题
      isImport
        ? (restSource = restSource.slice(0, 10) + ` code={${importName}Code}` + restSource.slice(10))
        : (restSource = restSource.slice(0, 10) + ` code={\`${getDemo(component, m[2])}\`}` + restSource.slice(10));
    }
    newSource = headSource + restSource;
    console.log('/////////////////newSource');
    console.log(newSource);
    console.log('/////////////////finish');
    console.log('/////////////////finish');
    console.log('/////////////////finish');
  }
  return improtAll(importComponentsList, newSource);
};
