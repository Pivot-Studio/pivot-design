import { useState } from 'react';
import ReactDom from 'react-dom/client';
import Button from './components/Button';
import './index.scss';
const App = () => {
  const [select, setSelect] = useState('');
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <div className="demo-item" onClick={() => setSelect('Button')}>
          Button
        </div>
      </div>
    );
  };
  return (
    <div>
      {select === '' ? demoSelect() : null}
      {select === 'Button' ? <Button /> : null}
    </div>
  );
};
ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
