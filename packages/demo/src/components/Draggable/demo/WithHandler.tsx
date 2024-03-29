import { DndContext, DraggableItem } from 'pivot-design';
import React, { useState } from 'react';
const WithHandler: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const onDragEnd = (e) => {
    const { delta } = e;
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };
  return (
    <DndContext onDragEnd={onDragEnd}>
      <DraggableItem id="drggable" className="demo-draggable-item" left={coordinates.x} top={coordinates.y} handle>
        Drag Me!
      </DraggableItem>
    </DndContext>
  );
};
export default WithHandler;
