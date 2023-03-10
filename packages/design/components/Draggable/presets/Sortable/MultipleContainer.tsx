import { useState } from 'react';
import { prefix } from '../../../constants';
import { UniqueIdentifier } from '../../types';
import { Sortable } from './Sortable';
import './Sortable.scss';
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
  // todo: 给Sortable 传一个DroppableContainer
  return (
    <div className={`${prefix}-sortable-wrap`}>
      {containers.map((containerId) => (
        <Sortable items={items[containerId]} direction="vertical" />
      ))}
    </div>
  );
}
