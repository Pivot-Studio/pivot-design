import Prism from 'prismjs';
import React, { useRef, useState, useEffect, TransitionEventHandler } from 'react';
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
  // 使用max-height实现不确定数值的transition
  const [codeDisplay, setCodeDisplay] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!codeRef.current) {
      return;
    }
    Prism.highlightElement(codeRef.current);
  }, [expand]);
  const onTransitionEnd: TransitionEventHandler<HTMLDivElement> = () => {
    if (!expand) {
      setCodeDisplay(false);
    }
  };
  return (
    <div className="pivot-code-box">
      <div className="pivot-code-box-demo">{children}</div>
      <div className="pivot-code-box-actions">
        {expand ? (
          <div className="pivot-code-box-icon" onClick={() => setExpand(false)}>
            <img src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg" />
          </div>
        ) : (
          <div
            className="pivot-code-box-icon"
            onClick={() => {
              setExpand(true);
              setCodeDisplay(true);
            }}
          >
            <img src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg" />
          </div>
        )}
      </div>
      <div
        className={`line-numbers ${codeDisplay ? 'display' : 'hidden'}`}
        onTransitionEnd={onTransitionEnd}
        style={{ maxHeight: expand ? '999px' : '0px', transition: 'max-height 300ms' }}
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
