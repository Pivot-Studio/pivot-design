import React, { useEffect } from 'react';
import { ModalProps } from 'pivot-design-props';
import { prefix } from '../constants';
import './index.scss';
import classnames from 'classnames';
import ModalCard from './components/modalcard';
import useModal from './useModal';
import { createPortal } from 'react-dom';

// todo: 蒙层关闭、不关闭；拖拽时无法关闭；mdx
const Modal: React.FC<ModalProps> = (props) => {
  const { maskstyle, open = false, children, hasMask = true, maskClosable = true, onCancel, modalRender } = props;

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      {open &&
        createPortal(
          <div className={classnames(`${prefix}-modal`)}>
            <div
              className={classnames(`${prefix}-modal-mask`, {
                [`${prefix}-modal-mask__hidden`]: !hasMask,
              })}
              style={maskstyle}
              onClick={maskClosable ? onCancel : () => {}}
            />
            {modalRender ? (
              modalRender(<ModalCard {...props}>{children}</ModalCard>)
            ) : (
              <ModalCard {...props}>{children}</ModalCard>
            )}
          </div>,
          document.body
        )}
    </>
  );
};
export { Modal, useModal };
