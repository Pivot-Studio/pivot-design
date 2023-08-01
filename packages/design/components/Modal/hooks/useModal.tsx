import React, { useState, useCallback } from 'react';
import { ModalProps } from 'pivot-design-props';
import usePatchElement from './usePatchElement';
import { Modal } from '..';

const ElementHolder = React.memo(
  React.forwardRef<React.ReactElement>((props, ref: any) => {
    const [elements, patchElement] = usePatchElement();
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
  console.log('1');
  const modalRef = React.useRef<any>();
  const [open, setOpen] = useState(true);

  const getModal = useCallback(
    (props: ModalProps) => {
      const modalOK = () => {
        props.modalOK?.();
        setOpen(false);
        modalRef.current?.patchElement(<></>);
      };
      const modalCancel = () => {
        props.modalCancel?.();
        setOpen(false);
        modalRef.current?.patchElement(<></>);
      };
      const prop = { ...props, open, modalCancel, modalOK };
      const modal = <Modal {...prop} />;
      modalRef.current?.patchElement(modal);
    },
    [1]
  );
  const fns = React.useMemo(() => getModal, [1]);
  return [fns, <ElementHolder ref={modalRef} />] as const;
};

export default useModal;
