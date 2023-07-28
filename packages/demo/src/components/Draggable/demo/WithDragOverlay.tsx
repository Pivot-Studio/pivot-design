import { DndContext, DraggableItem } from 'pivot-design';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './WithDragOverlay.scss';
const WithDragOverlay: React.FC = () => {
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
  const renderDragOverlay = ({ id, index, containerId, x, y }) => {
    return createPortal(
      <div className="demo-draggable-overlay" style={{ top: y, left: x }}>
        Overlay
      </div>,
      document.body
    );
  };
  return (
    <DndContext onDragEnd={onDragEnd} DragOverlay={renderDragOverlay}>
      <DraggableItem id="draggable" className="demo-draggable-item" left={coordinates.x} top={coordinates.y}>
        Drag Me!
      </DraggableItem>
    </DndContext>
  );
};
export default WithDragOverlay;
