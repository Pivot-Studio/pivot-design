import classNames from 'classnames';
import { prefix } from '../constants';
import { useDroppable } from './hooks/useDroppable';
import { useUniqueId } from './hooks/useUniqueId';
import './Droppable.scss';

export function Droppable(props: any) {
  const { className, children, index, top, left } = props;
  const { id, index: globalIndex } = useUniqueId();
  const { setDropNode, attributes, over } = useDroppable({
    index: index !== undefined ? index : globalIndex,
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
