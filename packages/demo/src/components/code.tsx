import React from 'react';
interface ICodeProps {
  children: string;
  className: string;
}
const Code: React.FC<ICodeProps> = (props) => {
  console.log(props);

  const { className, children } = props;

  return <code className={className}>{children}</code>;
};

export default Code;
