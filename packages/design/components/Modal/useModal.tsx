// import React, { useState, useCallback, useMemo } from 'react';
// import { ModalProps } from 'pivot-design-props';
// import { Modal } from '.';

// const useModal = () => {
//   const [open, setOpen] = useState(true);
//   const getModal = useMemo((props: ModalProps) => {
//     const onOk = () => {
//       props.onOk?.();
//       setOpen(false);
//     };
//     const onCancel = () => {
//       props.onCancel?.();
//       setOpen(false);
//     };
//     const prop = { open, ...props, onCancel, onOk };
//     const modal = <Modal {...prop}>{props.content}</Modal>;

//     return {
//       show:
//     }
//   }, []);
//   return [getModal, <ElementHolder ref={modalRef} />] as const;
// };

// export default useModal;
