export default `import ReactDom from 'react-dom/client';
import React from 'react';
import './index.scss';
function App() {
  return (
    <section>
      <h1>Pivot Design Editor</h1>
    </section>
  );
}

ReactDom.createRoot(document.getElementById('root')).render(<App />)
`;
