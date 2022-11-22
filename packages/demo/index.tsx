import { useState } from 'react';
import ReactDom from 'react-dom/client';
import Button from './components/Button.mdx';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div
          className={`demo-item ${select === 'Button' ? 'active' : ''}`}
          onClick={() => setSelect('Button')}
        >
          按钮
        </div>
      </div>
    );
  };
  return (
    <div className="pivot-design-docs">
      {demoSelect()}
      <div className="demo-component">
        {select === 'Button' ? <Button /> : null}
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
