import classNames from 'classnames';
import { prefix } from '../../../constants';
import { useDroppable } from '../../hooks/useDroppable';
import './Droppable.scss';

export function Droppable(props: any) {
  const { className, children, index, top, left, id } = props;
  const { setDropNode, attributes, over } = useDroppable({
    index,
    id,
  });

  return (
    <div
      ref={setDropNode}
      className={classNames(`${prefix}-droppable`, className, {
        [`__${prefix}_overing`]: over,
      })}
      style={{ top, left, ...attributes }}
    >
      {children}
      {'Droppable'}
    </div>
  );
}
