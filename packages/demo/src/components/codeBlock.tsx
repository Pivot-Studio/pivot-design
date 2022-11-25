import Prism from 'prismjs';
import React, { useRef, useState, useEffect } from 'react';
interface ICodeProps {
  children: React.ReactNode;
  code: string;
  /**
   * @example 1-2, 5, 9-20
   */
  line?: string;
}
const CodeBlock: React.FC<ICodeProps> = (props) => {
  const { code, children, line } = props;
  const [expand, setExpand] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!codeRef.current) {
      return;
    }
    Prism.highlightElement(codeRef.current);
  }, [expand]);
  return (
    <div className="pivot-code-box">
      <div className="pivot-code-box-demo">{children}</div>
      <div className="pivot-code-box-actions">
        {expand ? (
          <div className="pivot-code-box-icon" onClick={() => setExpand(false)}>
            <img src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg" />
          </div>
        ) : (
          <div className="pivot-code-box-icon" onClick={() => setExpand(true)}>
            <img src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg" />
          </div>
        )}
      </div>
      <div
        className="line-numbers"
        style={{ display: expand ? 'block' : 'none' }}
      >
        <pre
          className="data-prismjs-copy"
          lang="zh-Hans-CN"
          data-line={line}
          data-prismjs-copy="复制文本"
          data-prismjs-copy-error="按Ctrl+C复制"
          data-prismjs-copy-success="文本已复制！"
        >
          <code className="language-jsx" ref={codeRef}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
