const prettier = require('prettier');
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
function format(code) {
  return prettier.format(code, {
    semi: true,
    singleQuote: true,
    printWidth: 120
  });
}
module.exports = function loader(source) {
  let newSource = source.trim();
  const CodeBlockReg = /<CodeBlock(.*)>([\n\r\s\S]*?)<\/CodeBlock>/g;
  const H1Reg = /# (\w+)/;
  const component = H1Reg.exec(source)[1];
  let m;
  while ((m = CodeBlockReg.exec(source))) {
    newSource = newSource.replace(
      m[1],
      m[1] + ` code={\`${getDemo(component, m[2])}\`}`
    );
  }
  return newSource;
};
