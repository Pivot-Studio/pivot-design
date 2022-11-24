function getDemo(component: string) {
  return `import { Button } from 'pivot-design';
  import React from 'react';
  const App: React.FC = () => (
    <>
      ${component.trim()}
    </>
  );
  export default App;`;
}

export default {
  basic: getDemo(`
      <Button type="primary">按钮</Button>
      <Button>按钮</Button>
      <Button type="text">按钮</Button>
      <Button type="disabled">按钮</Button>
      `),
};