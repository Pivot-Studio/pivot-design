import classNames from 'classnames';
import { PopoverProps } from 'pivot-design-props';
import React, { cloneElement, useState } from 'react';
import { createPortal } from 'react-dom';
import { prefix } from '../constants';

import './index.scss';
import { usePopoverStyle } from './usePopoverStyle';

const Popover: React.FC<PopoverProps> = (props) => {
  const {
    children,
    content,
    placement = 'bottom',
    popoverClass = '',
    disabled = false,
    arrowShow = true,
    triggerType = 'hover',
  } = props;

  // 需要拿到渲染之后的DOM，而放在useEffect里面又无法使用hook
  const [triggerDomState, setTriggerDomState] = useState<HTMLElement>();
  const [popoverDomState, setPopoverDomState] = useState<HTMLDivElement>();
  function setTriggerDom(node: HTMLDivElement) {
    if (node && triggerDomState !== node) {
      setTriggerDomState(node);
    }
  }
  function setPopoverDom(node: HTMLDivElement) {
    if (node && popoverDomState !== node) {
      setPopoverDomState(node);
    }
  }

  // 给children加个ref
  const triggerDom = cloneElement(children, {
    ref: setTriggerDom,
  });

  // popover的样式
  let popoverDomStyle = usePopoverStyle(triggerDomState, popoverDomState, placement);
  const { offsetX, offsetY, arrowX, arrowY } = popoverDomStyle;

  // 设置显示popover的条件
  let [show, setShow] = useState(false);
  if (triggerType === 'hover') {
    let timeout: number;
    triggerDomState?.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        setShow(false);
      }, 200);
    });
    popoverDomState?.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        setShow(false);
      }, 100);
    });
    triggerDomState?.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      !show && setShow(true);
    });
    popoverDomState?.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      !show && setShow(true);
    });
  } else if (triggerType === 'click') {
    triggerDomState?.addEventListener('click', () => {
      setShow(!show);
    });
  }
  return (
    <>
      <span className={`${prefix}-trigger`}>{triggerDom}</span>
      {createPortal(
        <div
          ref={setPopoverDom}
          className={classNames(`${prefix}-popover`, popoverClass)}
          style={
            {
              left: offsetX,
              top: offsetY,
              opacity: !disabled && show ? '1' : '0',
              '--arrowX': arrowX + 'px',
              '--arrowY': arrowY + 'px',
              show: arrowShow ? 'block' : 'none',
            } as React.CSSProperties
          }
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
};

export default Popover;
