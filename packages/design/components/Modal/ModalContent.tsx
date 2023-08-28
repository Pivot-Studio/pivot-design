import React, { MouseEventHandler } from 'react';
import { ModalProps } from 'pivot-design-props';
import Button from '../Button';
import { prefix } from '../constants';
import { IconClose } from 'pivot-design-icon';
import classnames from 'classnames';

const ModalContent: React.FC<ModalProps> = (props) => {
  const {
    title,
    style,
    className,
    footer,
    isClose = true,
    hasMask,
    maskstyle,
    maskClosable,
    children,
    position,
    closeIcon,
    OkButtonProps,
    cancelButtonProps,
    footerButtonDirection = 'row',
    onOk,
    onCancel,
  } = props;

  const positionStyle = { left: position?.x, top: position?.y };
  const _onCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    onCancel?.(e);
  };
  const _onOk: MouseEventHandler<HTMLButtonElement> = (e) => {
    onOk?.(e);
  };
  return (
    <div className={classnames(`${prefix}-modal`)}>
      {/* 这里避免蒙层出现后，页面可以滚动 */}
      <style>{'body{overflow:hidden}'}</style>
      <div
        className={classnames(`${prefix}-modal-mask`, {
          [`${prefix}-modal-mask__hidden`]: !hasMask,
        })}
        style={maskstyle}
        onClick={maskClosable ? onCancel : () => {}}
      />

      <div className={classnames(`${prefix}-modal-card`, className)} style={{ ...style, ...positionStyle }}>
        <div className={`${prefix}-modal-title`}>
          {title}
          {isClose && (
            <div className={`${prefix}-modal-cancel`} onClick={onCancel}>
              {closeIcon === undefined ? <IconClose theme="secondary" /> : closeIcon}
            </div>
          )}
        </div>
        <div className={`${prefix}-modal-content`}>{children}</div>

        <div className={`${prefix}-modal-footer`}>
          {!footer ? (
            <div
              className={classnames({
                [`${prefix}-modal-col-footer`]: footerButtonDirection == 'col',
                [`${prefix}-modal-row-footer`]: footerButtonDirection == 'row',
              })}
            >
              <Button type="primary" onClick={_onOk} {...OkButtonProps}>
                确定
              </Button>

              <Button onClick={_onCancel} {...cancelButtonProps}>
                取消
              </Button>
            </div>
          ) : (
            <div>{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ModalContent;
