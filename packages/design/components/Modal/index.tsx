import React from 'react';
import { ModalProps } from 'pivot-design-props';
//import Button from '../Button';
import { prefix } from '../constants';
//import useDrag from './hooks/useDrag';
import './index.scss';
//import { Close } from 'pivot-design-icon';
import classnames from 'classnames';
import ModalCard from './modalcard';
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
    isClose = true,
    children,
    position,
    isMask = true,
    closeIcon,
    OkButtonProps,
    CancelButtonProps,
    footerButtonDirection = 'row',
    ModalCancel,
    ModalOK,
    ModalRender,
  } = props;
  return (
    <>
      {open && (
        <div className={classnames(`${prefix}-modal`, { [`${prefix}-modal-mask`]: isMask })} style={maskstyle}>
          {ModalRender ? (
            ModalRender(
              <ModalCard
                title={title}
                open={open}
                style={style}
                footer={footer}
                isClose={isClose}
                position={position}
                closeIcon={closeIcon}
                OkButtonProps={OkButtonProps}
                CancelButtonProps={CancelButtonProps}
                className={className}
                content={content}
                footerButtonDirection={footerButtonDirection}
                ModalCancel={ModalCancel}
                ModalOK={ModalOK}
              >
                {children}
              </ModalCard>
            )
          ) : (
            <ModalCard
              title={title}
              open={open}
              style={style}
              footer={footer}
              isClose={isClose}
              position={position}
              closeIcon={closeIcon}
              OkButtonProps={OkButtonProps}
              CancelButtonProps={CancelButtonProps}
              className={className}
              content={content}
              footerButtonDirection={footerButtonDirection}
              ModalCancel={ModalCancel}
              ModalOK={ModalOK}
            >
              {children}
            </ModalCard>
          )}
          {/* <div
            className={classnames(`${prefix}-modal-card`, className)}
            style={{ ...style, ...postionStyle }}
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
          </div> */}
        </div>
      )}
    </>
  );
};
export default Modal;
