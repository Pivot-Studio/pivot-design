function getDemo(component: string) {
  return `import { DraggableList, DraggableItem } from 'pivot-design';
  import React, { useState } from 'react';
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const reorderItems = (oldIndex: number, newIndex: number) => setItems((items) => arrayMove(items, oldIndex, newIndex));
  const App: React.FC = () => (
    <>
      ${component.trim()}
    </>
  );
  export default App;`;
}

export default {
  basic: `import { DndContext, DraggableItem } from 'pivot-design'
  import React, { useState } from 'react';
const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
const onDragEnd = ({ delta }: { delta: { x: number; y: number }; event: Event }) => {
  setCoordinates(({ x, y }) => {
    return {
      x: x + delta.x,
      y: y + delta.y,
    };
  });
};
const App: React.FC = () => (
  <>
  <DndContext onDragEnd={onDragEnd}>
    <DraggableItem className="demo-draggable-item" left={coordinates.x} top={coordinates.y}>
      draggable
    </DraggableItem>
  </DndContext>
  </>
);
export default App;`,
  verticalSortable: `import { Sortable } from 'pivot-design'
const App: React.FC = () => (
  <Sortable itemClassName="demo-draggable-item"></Sortable>
);
export default App;`,
  droppable: `import { DndContext, DraggableItem, Droppable } from 'pivot-design'
import React, { useState } from 'react';
const onDragEnd = ({ id, isDrop }: { id: string; isDrop: boolean }) => {
  setParent(isDrop ? id : '');
};
const DraggableBlock = () => (
  <DraggableItem className="demo-draggable-item" id={'A'}>
    draggable
  </DraggableItem>
);
const [parent, setParent] = useState('');
const App: React.FC = () => (
  <DndContext onDragEnd={onDragEnd}>
    <div style={{ minWidth: '150px', display: 'flex' }}>{parent !== 'A' ? <DraggableBlock /> : null}</div>
    <Droppable>{parent === 'A' ? <DraggableBlock /> : null}</Droppable>
  </DndContext> 
);
export default App;`,
};
