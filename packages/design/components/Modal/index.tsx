import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ModalProps, ButtonProps } from 'pivot-design-props';
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
  const getButtonDisabled = (ButtonProps: ButtonProps | undefined) => {
    if (ButtonProps) {
      const { disabled } = ButtonProps;
      if (disabled) {
        return true;
      }
    }
    return false;
  };
  //const {} = CancelButtonProps;
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (getButtonDisabled(CancelButtonProps)) {
      return;
    }
    const { ModalCancel } = props;
    ModalCancel?.(e);
  };
  const postionStyle = { left: postion?.x, top: postion?.y };
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (getButtonDisabled(OkButtonProps)) {
      return;
    }
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
                {closeIcon === undefined ? (
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 20 20">
                    <title>close</title>
                    <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z" />
                  </svg>
                ) : (
                  closeIcon
                )}
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
