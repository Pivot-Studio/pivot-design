import React from 'react';
import { ModalProps } from 'pivot-design-props';
import { prefix } from '../constants';
import './index.scss';
import classnames from 'classnames';
import ModalCard from './components/modalcard';
import useModal from './hooks/useModal';
const Modal: React.FC<ModalProps> = (props) => {
  const { maskstyle, open = false, children, isMask = true, modalRender } = props;
  return (
    <>
      {open && (
        <div className={classnames(`${prefix}-modal`, { [`${prefix}-modal-mask`]: isMask })} style={maskstyle}>
          {modalRender ? (
            modalRender(<ModalCard {...props}>{children}</ModalCard>)
          ) : (
            <ModalCard {...props}>{children}</ModalCard>
          )}
        </div>
      )}
    </>
  );
};
export { Modal, useModal };
