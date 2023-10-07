import { Tabs } from 'pivot-design';
import React, { useState } from 'react';

const App: React.FC = () => {
  const items = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab Second',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <>
      <Tabs items={items} type="card" />
    </>
  );
};
export default App;
