import React from 'react';
import { ModalProps } from 'pivot-design-props';
import Button from '../../Button';
import { prefix } from '../../constants';
import './modalcard.scss';
import { Close } from 'pivot-design-icon';
import classnames from 'classnames';
const ModalCard: React.FC<ModalProps> = (props) => {
  const {
    title,
    content,
    style,
    className,
    footer,
    isClose = true,
    children,
    position,
    closeIcon,
    OkButtonProps,
    cancelButtonProps,
    footerButtonDirection = 'row',
    modalOK,
    modalCancel,
  } = props;

  const positionStyle = { left: position?.x, top: position?.y };

  return (
    <div className={classnames(`${prefix}-modal-card`, className)} style={{ ...style, ...positionStyle }}>
      {isClose && (
        <div className={`${prefix}-modal-cancel`} onClick={modalCancel}>
          {closeIcon === undefined ? <Close theme="secondary" /> : closeIcon}
        </div>
      )}
      <div className={`${prefix}-modal-title`}>{title}</div>
      <div className={`${prefix}-modal-content`}>
        {content}
        {children}
      </div>

      <div className={`${prefix}-modal-footer`}>
        {footer === undefined ? (
          <div
            className={classnames({
              [`${prefix}-modal-col-footer`]: footerButtonDirection == 'col',
              [`${prefix}-modal-row-footer`]: footerButtonDirection == 'row',
            })}
          >
            <Button size="small" type="primary" onClick={modalOK} {...OkButtonProps}>
              确定
            </Button>

            <Button size="small" onClick={modalCancel} {...cancelButtonProps}>
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
