import React from 'react';
import { ModalProps } from 'pivot-design-props';
//import Button from '../Button';
import { prefix } from '../constants';
//import useDrag from './hooks/useDrag';
import './index.scss';
//import { Close } from 'pivot-design-icon';
import classnames from 'classnames';
import ModalCard from './components/modalcard';
const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    content,
    style,
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
        </div>
      )}
    </>
  );
};
export default Modal;
