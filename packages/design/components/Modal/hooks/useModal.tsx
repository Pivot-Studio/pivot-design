import React, { useState, useCallback } from 'react';
import { ModalProps } from 'pivot-design-props';
import { Modal } from '..';

const ElementHolder = React.memo(
  React.forwardRef<React.ReactElement>((props, ref: any) => {
    const [elements, patchElement] = useState();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      []
    );
    return <>{elements}</>;
  })
);
const useModal = () => {
  const modalRef = React.useRef<any>();
  const [open, setOpen] = useState(true);
  const getModal = useCallback((props: ModalProps) => {
    const modalOK = () => {
      props.modalOK?.();
      setOpen(false);
      modalRef.current?.patchElement();
    };
    const modalCancel = () => {
      props.modalCancel?.();
      setOpen(false);
      modalRef.current?.patchElement();
    };
    const prop = { ...props, open, modalCancel, modalOK };
    const modal = <Modal {...prop} />;
    modalRef.current?.patchElement(modal);
  }, []);
  return [getModal, <ElementHolder ref={modalRef} />] as const;
};

export default useModal;
