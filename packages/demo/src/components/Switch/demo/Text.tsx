import { Switch } from 'pivot-design';
import React from 'react';
import { IconClose, IconWarning } from 'pivot-design-icon';

const App: React.FC = () => {
  return (
    <>
      <Switch size="normal" checkedText="开" uncheckedText="关" />
      <Switch size="large" checkedText="开" uncheckedText="关" />
      <Switch
        size="normal"
        checkedText={<IconWarning style={{ margin: 0 }} />}
        uncheckedText={<IconClose style={{ margin: 0 }} />}
      />
    </>
  );
};
export default App;
