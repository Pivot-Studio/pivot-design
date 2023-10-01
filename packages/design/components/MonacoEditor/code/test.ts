export default `import ReactDom from 'react-dom/client';
import React from 'react';
function App() {
  return (
    <section>
      <h1 style={{ color: '#fff' }}>Pivot Design Editor</h1>
    </section>
  );
}

ReactDom.createRoot(document.getElementById('root')).render(<App />)
`;
