import React from 'react';
import { ModalProps } from 'pivot-design-props';
import Button from '../Button';
import { prefix } from '../constants';
import useDrag from './hooks/useDrag';
import './modalcard.scss';
import { Close } from 'pivot-design-icon';
import classnames from 'classnames';
const ModalCard: React.FC<ModalProps> = (props) => {
  const {
    title,
    content,
    style,
    isDragge = false,
    className,
    open,
    footer,
    isClose = true,
    children,
    position,
    closeIcon,
    OkButtonProps,
    CancelButtonProps,
    footerButtonDirection = 'row',
  } = props;
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { ModalCancel } = props;
    ModalCancel?.(e);
  };
  const positionStyle = { left: position?.x, top: position?.y };
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { ModalOK } = props;
    ModalOK?.(e);
  }; // useDisplay(open);
  const ModalRef = useDrag({ open, maring: [10, 10, 10, 10], isDragge });
  return (
    <div
      className={classnames(`${prefix}-modal-card`, className)}
      style={{ ...style, ...positionStyle }}
      ref={ModalRef}
    >
      {isClose && (
        <div className={`${prefix}-modal-cancel`} onClick={handleCancel}>
          {closeIcon === undefined ? <Close /> : closeIcon}
        </div>
      )}
      <div className={`${prefix}-modal-title`}>{title}</div>
      <div className={`${prefix}-modal-content`}>{content}</div>
      {children}
      <div className={`${prefix}-modal-footer`}>
        {footer === undefined ? (
          <div
            className={classnames({
              [`${prefix}-modal-col-footer`]: footerButtonDirection == 'col',
              [`${prefix}-modal-row-footer`]: footerButtonDirection == 'row',
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
  );
};
export default ModalCard;
