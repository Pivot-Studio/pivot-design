import { useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';
import ButtonMdx from './src/components/Button/Button.mdx';
import CardMdx from './src/components/Card/Card.mdx';
import { Button, Card } from 'pivot-design';
import CodeBlock from './src/components/codeBlock';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('Button');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div
          className={`demo-item ${select === 'Button' ? 'active' : ''}`}
          onClick={() => setSelect('Button')}
        >
          按钮
        </div>
        <div
          className={`demo-item ${select === 'Card' ? 'active' : ''}`}
          onClick={() => setSelect('Card')}
        >
          卡片
        </div>
      </div>
    );
  };
  return (
    <div className="pivot-design-docs">
      <div className="pivot-design-docs-title">
        <div className="title">Pivot-Design</div>
      </div>
      <div className="pivot-design-docs-content">
        {demoSelect()}
        <div className="demo-component">
          {select === 'Button' ? (
            <ButtonMdx components={{ Button, CodeBlock }} />
          ) : null}
          {select === 'Card' ? (
            <CardMdx components={{ Card, CodeBlock }} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
