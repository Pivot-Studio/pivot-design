import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ModalProps } from 'pivot-design-props';
import Button from '../Button';
import { prefix } from '../constants';
import useDrag from './hooks/useDrag';
import './index.scss';
import classnames from 'classnames';
const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    content,
    style,
    isDragge = false,
    maskstyle,
    className,
    open,
    footer,
    closed = false,
    children,
    postion,
    isMask = true,
    closeIcon,
    OkButtonProps,
    CancelButtonProps,
    footerType = true,
  } = props;
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { ModalCancel } = props;
    ModalCancel?.(e);
  };
  const postionStyle = { left: postion?.x, top: postion?.y };
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { ModalOK } = props;
    ModalOK?.(e);
  }; // useDisplay(open);
  const ModalRef = useDrag({ open, maring: [10, 10, 10, 10], isDragge });
  return (
    <>
      {open && (
        <div className={classnames(`${prefix}-modal`, { [`${prefix}-modal-mask`]: isMask })} style={maskstyle}>
          <div
            className={classnames(`${prefix}-modal-card`, className)}
            style={{ ...style, ...postionStyle }}
            ref={ModalRef}
          >
            {!closed && (
              <div className={`${prefix}-modal-cancel`} onClick={handleCancel}>
                {closeIcon === undefined ? 'X' : closeIcon}
              </div>
            )}
            <div className={`${prefix}-modal-title`}>{title}</div>
            <div className={`${prefix}-modal-content`}>{content}</div>
            {children}
            <div className={`${prefix}-modal-footer`}>
              {footer === undefined ? (
                <div
                  className={classnames({
                    [`${prefix}-modal-col-footer`]: footerType,
                    [`${prefix}-modal-row-footer`]: !footerType,
                  })}
                >
                  <Button size="small" onClick={handleOk} {...OkButtonProps}>
                    确定
                  </Button>

                  <Button size="small" onClick={handleCancel} {...CancelButtonProps}>
                    取消
                  </Button>
                </div>
              ) : (
                <div>{footer}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
