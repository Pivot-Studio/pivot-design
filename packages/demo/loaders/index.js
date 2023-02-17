const prettier = require('prettier');
function format(code) {
  return prettier.format(code, {
    semi: true,
    singleQuote: true,
    printWidth: 120,
  });
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
  while ((m = CodeBlockReg.exec(sourceCode))) {
    if (m[1].includes('code')) continue;
    const headSource = newSource.slice(0, m.index);
    let restSource = newSource.slice(m.index);
    if (m[1]) {
      restSource = restSource.replace(m[1], m[1] + ` code={\`${getDemo(component, m[2])}\`}`);
    } else {
      // 解决当m[1]=''的时候无法replace的问题
      restSource = restSource.slice(0, 10) + ` code={\`${getDemo(component, m[2])}\`}` + restSource.slice(10);
    }
    newSource = headSource + restSource;
  }
  return newSource;
};
