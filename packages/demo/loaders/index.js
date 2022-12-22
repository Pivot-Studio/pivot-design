module.exports = function loader(source) {
  let newSource = source.trim();
  // 非贪婪模式匹配
  const CodeBlockReg = /<CodeBlock(.*)>([\n\r\s\S]*?)<\/CodeBlock>/g;
  const H1Reg = /# (\w+)/;
  // eslint-disable-next-line prefer-destructuring
  const component = H1Reg.exec(source)[1];
  let m;
  function getDemo(name, component) {
    return `import { ${name} } from 'pivot-design';
    import React from 'react';
    const App: React.FC = () => (
      <>
        ${component.trim()}
      </>
    );
    export default App;`;
  }

  while ((m = CodeBlockReg.exec(source))) {
    if (m[1].includes('code')) continue;
    newSource = newSource.replace(
      m[1],
      m[1] + ` code={\`${getDemo(component, m[2])}\`}`
    );
  }
  return newSource;
};
