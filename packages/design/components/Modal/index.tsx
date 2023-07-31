import React from 'react';
import { ModalProps } from 'pivot-design-props';
import { prefix } from '../constants';
import './index.scss';
import classnames from 'classnames';
import ModalCard from './components/modalcard';
import useModal from './useModal';
const Modal: React.FC<ModalProps> = (props) => {
  const { maskstyle, open, children, isMask = true, ModalRender } = props;
  return (
    <>
      {open && (
        <div className={classnames(`${prefix}-modal`, { [`${prefix}-modal-mask`]: isMask })} style={maskstyle}>
          {ModalRender ? (
            ModalRender(<ModalCard {...props}>{children}</ModalCard>)
          ) : (
            <ModalCard {...props}>{children}</ModalCard>
          )}
        </div>
      )}
    </>
  );
};
export { Modal, useModal };
