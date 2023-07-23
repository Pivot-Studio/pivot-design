import { DndContext, SortableContext, SortableItem, useDroppable, arrayMove } from 'pivot-design';
import { useRef, useState } from 'react';
import './MultipleContainer.scss';
import { createPortal } from 'react-dom';
const containerData = { type: 'container' };

const Container = ({ children, id }) => {
  // todo: 这里会导致内部data一直刷新
  const { over, setDropNode } = useDroppable({ id, data: containerData });

  return (
    <div
      className={`demo-sortable-wrap __demo-sortable-vertical ${over ? 'demo-container-over' : ''}`}
      ref={setDropNode}
    >
      {children}
    </div>
  );
};

const MultipleContainer = () => {
  const [items, setItems] = useState({
    A: ['A1', 'A2', 'A3'],
    B: ['B1', 'B2', 'B3'],
  });
  const [containers, setContainers] = useState(Object.keys(items) as string[]);

  const renderDragOverlay = (e) => {
    const { rect, x, y, id } = e;
    const { width, height } = rect.current;
    return createPortal(
      <div
        className="demo-sortable-item drag-overlay"
        style={{ width, height, top: y, left: x, boxSizing: 'border-box' }}
      >
        {id}
      </div>,
      document.body
    );
  };
  return (
    <DndContext
      DragOverlay={renderDragOverlay}
      onDragEnd={(e) => {
        const { active, over } = e;
        if (!active || !over) {
          return;
        }

        setItems((items) => ({
          ...items,
          [active.containerId]: arrayMove(items[active.containerId], active.index, over.index),
        }));
      }}
      onDragMove={({ active, over, container, id }) => {
        if (!active || !over) {
          return;
        }
        const { index: activeIndex, containerId: activeContainer, items: activeItems } = active;
        const { index: overIndex, containerId: overContainer, items: overItems } = over;

        if (!overContainer) {
          return;
        }
        if (activeContainer != overContainer) {
          // 移入别的container

          setItems((items) => {
            return {
              ...items,
              [activeContainer]: activeItems.filter((i) => i != id),
              [overContainer]: [...overItems.slice(0, overIndex), id, ...overItems.slice(overIndex, overItems.length)],
            };
          });
        }
      }}
    >
      {containers.map((container) => {
        return (
          <Container key={container} id={container}>
            <SortableContext items={items[container]} id={container} key={container}>
              {items[container].map((item, index) => {
                return (
                  <SortableItem id={item} className="demo-sortable-item" key={index} index={index}>
                    {item}
                  </SortableItem>
                );
              })}
            </SortableContext>
          </Container>
        );
      })}
    </DndContext>
  );
};

export default MultipleContainer;
