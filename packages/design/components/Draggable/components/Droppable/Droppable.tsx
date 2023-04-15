import classNames from 'classnames';
import { prefix } from '../../../constants';
import { useDroppable } from '../../hooks/useDroppable';
import './Droppable.scss';

export function Droppable(props: any) {
  const { className, children, style } = props;
  const { setDropNode, attributes, over } = useDroppable({
    id: 'droppable',
    data: { type: 'container' },
  });

  return (
    <div
      ref={setDropNode}
      className={classNames(`${prefix}-droppable`, className, {
        [`__${prefix}_overing`]: over,
      })}
      style={{ ...style, ...attributes }}
    >
      {children}
      {'Droppable'}
    </div>
  );
}
