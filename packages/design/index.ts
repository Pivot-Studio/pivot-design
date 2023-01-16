import Button from './components/Button';
export { DraggableItem, DndContext, Sortable } from './components/Draggable';
export * from './components/hooks';
export { Button };

export const arrayMove = (array: any[], from: number, to: number) => {
  const resArray = array.slice();
  resArray.splice(to < 0 ? to + array.length : to, 0, resArray.splice(from, 1)[0]);
  return resArray;
};

// 引用默认主题色
document.body.setAttribute('pivot-theme', 'light');
