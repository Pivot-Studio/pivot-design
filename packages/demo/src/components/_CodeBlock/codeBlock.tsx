import Prism from 'prismjs';
import CodeExpendIcon from '../../images/codeExpend';
import CodeUnexpendIcon from '../../images/codeUnexpand';
import './index.scss';
import React, { useRef, useState, useEffect, TransitionEventHandler, CSSProperties } from 'react';
interface ICodeProps {
  children: React.ReactNode;
  style?: CSSProperties;
  code: string;
  /**
   * @example 1-2, 5, 9-20
   */
  line?: string;
}
const CodeBlock: React.FC<ICodeProps> = (props) => {
  const { code, children, line, style } = props;
  const [expand, setExpand] = useState(false);
  // 使用max-height实现不确定数值的transition
  const [codeDisplay, setCodeDisplay] = useState(false);
  const codeRef = useRef<HTMLElement>(null)
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
      <div className="pivot-code-box-demo" style={style}>
        {children}
      </div>

      <div className="pivot-code-box-actions">
        {expand ? (
          <div
            className="pivot-code-box-icon"
            onClick={() => {
              setExpand(false);
              setCodeDisplay(false);
            }}
          >
            <CodeUnexpendIcon />
          </div>
        ) : (
          <div
            className="pivot-code-box-icon"
            onClick={() => {
              setExpand(true);
              setCodeDisplay(true);
            }}
          >
            <CodeExpendIcon />
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
          {...(line ? { 'data-line': line } : {})}
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
