import './theme/global.scss';
import Button from './components/Button';
export {
  DraggableItem,
  SortableItem,
  DndContext,
  useDraggable,
  useDroppable,
  useSortable,
  Droppable,
  SortableContext,
} from './components/Draggable';
import Icon from './components/Icon';
import Input from './components/Input';
import Card from './components/Card';
import Skeleton from './components/Skeleton';
import Popover from './components/Popover/';
import Transition from './components/Transition';

export { Button, Icon, Input, Card, Skeleton, Popover, Transition };

export const arrayMove = (array: any[], from: number, to: number) => {
  const resArray = array.slice();
  resArray.splice(to < 0 ? to + array.length : to, 0, resArray.splice(from, 1)[0]);
  return resArray;
};

// 引用默认主题色
document.body.setAttribute('pivot-theme', 'dark');
