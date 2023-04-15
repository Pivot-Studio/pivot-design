import { DndContext, DraggableItem, Droppable } from 'pivot-design';
import React, { useState } from 'react';
const Basic: React.FC = () => {
  const [parent, setParent] = useState('');
  const onDragEnd = ({ id, isDrop }) => {
    setParent(isDrop ? id : '');
  };
  return (
    <DndContext onDragEnd={onDragEnd}>
      <div style={{ minWidth: '150px', display: 'flex' }}>
        {parent !== 'A' ? (
          <DraggableItem className="demo-draggable-item" id={'A'}>
            draggable
          </DraggableItem>
        ) : null}
      </div>
      <Droppable style={{ textAlign: 'center' }}>
        {parent === 'A' ? (
          <DraggableItem className="demo-draggable-item" id={'A'}>
            draggable
          </DraggableItem>
        ) : null}
      </Droppable>
    </DndContext>
  );
};
export default Basic;
