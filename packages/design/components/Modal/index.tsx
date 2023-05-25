import React, { useEffect, useRef, useState } from 'react';
import { ModalProps } from 'pivot-design-props';
import Button from '../Button';
import './index.scss';
const Modal: React.FC<ModalProps> = (props) => {
  const { title, content, open, ModalCancel = () => {}, ModalOK = () => {}, footer = true, closed = false } = props;
  const [display, useDisplay] = useState(open);
  return (
    <>
      {display && (
        <div className="modal-mask">
          <div className="modal-card">
            {!closed && (
              <div className="modal-cancel" onClick={() => useDisplay(false)}>
                X
              </div>
            )}
            <div className="modal-title">{title}</div>
            <div className="modal-content">{content}</div>
            {footer == true ? (
              <div className="modal-footer">
                <Button onClick={() => ModalOK()}>确定</Button>
                <Button onClick={() => ModalCancel()}>取消</Button>
              </div>
            ) : (
              <div className="modal-footer">{footer}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
