import { DndContext, SortableContext, SortableItem, useDroppable, arrayMove } from 'pivot-design';
import { useState } from 'react';
import './MultipleContainer.scss';
import { createPortal } from 'react-dom';

const Container = ({ children, id }) => {
  const { over, setDropNode } = useDroppable({ id, data: { type: 'container' } });

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
  // const reorderItems = ({ active, over }: DragEndEvent) => {
  //   setItems((items) => arrayMove(items, active.index, over.index));
  // };
  return (
    <DndContext
      DragOverlay={renderDragOverlay}
      onDragEnd={(e) => {
        const { active, over } = e;
        console.log('====end', {
          ...items,
          [active.containerId]: arrayMove(items[active.containerId], active.index, over.index),
        });

        setItems((items) => ({
          ...items,
          [active.containerId]: arrayMove(items[active.containerId], active.index, over.index),
        }));
      }}
      onDragMove={({ active, over, container, id }) => {
        const { index: activeIndex, containerId: activeContainer, items: activeItems } = active;
        const { index: overIndex, containerId: overContainer, items: overItems } = over;

        if (!overContainer) {
          return;
        }

        if (activeContainer != overContainer) {
          setItems((items) => {
            // if (overIndex === overItems.length - 1) {
            //   overIndex += 1;
            // }
            console.log('====over', active, over, {
              ...items,
              [activeContainer]: activeItems.filter((i) => i != id),
              [overContainer]: [...overItems.slice(0, overIndex), id, ...overItems.slice(overIndex, overItems.length)],
            });

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