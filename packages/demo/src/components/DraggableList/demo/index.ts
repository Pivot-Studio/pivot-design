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
  basic: getDemo(`
        <DraggableList
          onDragEnd={(oldIndex, newIndex) => reorderItems(oldIndex, newIndex)}
         >
          {items.map((item) => {
            return <DraggableItem className="demo-list-item">{item}</DraggableItem>;
          })}
        </DraggableList>
      `),
};
