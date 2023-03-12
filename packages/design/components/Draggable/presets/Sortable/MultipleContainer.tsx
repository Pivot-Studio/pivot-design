import classNames from 'classnames';
import { DndContext } from '../../context/DndContext';
import { useState } from 'react';
import { prefix } from '../../../constants';
import { useDroppable } from '../../hooks/useDroppable';
import { UniqueIdentifier } from '../../types';
import { Sortable } from './Sortable';
import './Sortable.scss';
import SortableItem from '../../components/Draggable/SortableItem';

function DroppableContainer(props: any) {
  const { id, children } = props;
  const { setDropNode, attributes, over } = useDroppable({ id, data: { sortable: { type: 'container' } } });

  return (
    <div
      className={classNames(`${prefix}-sortable-wrap`, `__${prefix}-sortable-vertical`, {
        [`__${prefix}_overing`]: over,
      })}
      style={{ ...attributes }}
      ref={setDropNode}
    >
      {children}
    </div>
  );
}

export function MultipleContainer(props: any) {
  const { items: initialItems } = props;
  const [items, setItems] = useState(
    () =>
      initialItems ?? {
        A: ['A1', 'A2', 'A3'],
        B: ['B1', 'B2', 'B3'],
      }
  );
  const [containers, setContainers] = useState(Object.keys(items) as UniqueIdentifier[]);
  // todo: 给Sortable 传一个DroppableContainer,通过判断containerId来去执行动画算法
  return (
    <DndContext
      sortable={{ direction: 'vertical' }}
      onDragMove={({ activeNode, overNode, container: overContainerId }) => {
        const { id } = activeNode.current;
        const { overId } = overNode.current;
        const { containerId } = activeNode.current.sortable;
        const { index: overIndex } = overNode.current.sortable;

        if (!overContainerId || !containerId) {
          return;
        }

        if (overContainerId != containerId) {
          setItems((items) => {
            const activeItems = items[containerId];
            const overItems = items[overContainerId];

            return {
              ...items,
              [containerId]: activeItems.filter((i) => i != id),
              [overContainerId]: [
                ...overItems.slice(0, overIndex),
                id,
                ...overItems.slice(overIndex, overItems.length + 1),
              ],
            };
          });
        }
      }}
    >
      {containers.map((containerId) => (
        <DroppableContainer id={containerId}>
          {items[containerId].map((item, index) => (
            <SortableItem index={index} key={index} id={item} containerId={containerId}>
              {item}
            </SortableItem>
          ))}
        </DroppableContainer>
      ))}
    </DndContext>
  );
}
