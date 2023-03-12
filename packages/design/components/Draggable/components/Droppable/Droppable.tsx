import classNames from 'classnames';
import { prefix } from '../../../constants';
import { useDroppable } from '../../hooks/useDroppable';
import './Droppable.scss';

export function Droppable(props: any) {
  const { className, children, top, left } = props;
  const { setDropNode, attributes, over } = useDroppable({
    id: 'droppable',
    data: { sortable: { type: 'container' } },
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
