import React, { Component, MouseEventHandler } from 'react';
import { ModalProps } from 'pivot-design-props';
import './index.scss';
import ModalContent from './ModalContent';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const ModalFC: React.FC<ModalProps> = (props) => {
  const { open, children } = props;
  return <>{open && createPortal(<ModalContent {...props}>{children}</ModalContent>, document.body)}</>;
};

class Modal extends Component<ModalProps, {}> {
  static defaultProps = {
    maskstyle: {},
    open: false,
    children: null,
    hasMask: true,
    maskClosable: true,
    onCancel: () => {},
    modalRender: null,
  };

  static show = (props: ModalProps) => {
    const modalDiv = document.createElement('div');
    const modalRoot = createRoot(modalDiv);
    document.body.appendChild(modalDiv);

    const destory = () => {
      modalRoot.unmount();
      modalDiv.parentNode?.removeChild(modalDiv);
    };
    const _onCancel: MouseEventHandler<HTMLElement> = (e) => {
      props.onCancel?.(e);
      destory();
    };
    const _onOk: MouseEventHandler<HTMLElement> = (e) => {
      props.onOk?.(e);
      destory();
    };
    modalRoot.render(<Modal open={true} {...props} onCancel={_onCancel} onOk={_onOk} />);
  };

  constructor(props: ModalProps) {
    super(props);
  }
  render(): React.ReactNode {
    return <ModalFC {...this.props}>{this.props.children}</ModalFC>;
  }
}

export default Modal;
