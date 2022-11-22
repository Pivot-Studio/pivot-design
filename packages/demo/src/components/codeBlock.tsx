import React from 'react';
interface ICodeProps {
  children: React.ReactNode;
  code: string;
}
const CodeBlock: React.FC<ICodeProps> = (props) => {
  const { code, children } = props;

  return (
    <div>
      <div>{children}</div>
      <div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
