import { Dispatch, ElementType, MutableRefObject, ReactNode } from 'react';
import { DragEndEvent, DragMoveEvent, DragStartEvent } from '../sensors/events';
import { Sensor } from '../sensors/mouse/types';
import { Coordinate, Data, DraggableNode, UniqueIdentifier } from '../types';
import Manager from './manager';

export enum DragActionEnum {
  ACTIVATED,
  SET_CONTAINER,
  INACTIVATED,
  PUSH_NODE,
  REMOVE_NODE,
  TRANSFORM,
}
export interface Activator {
  eventName: string;
  handler: (event: Event, id: UniqueIdentifier) => void;
}

export type DroppableRectMap = Map<string | number, { clientRect: DOMRect; id: UniqueIdentifier }[]>;
export interface State {
  /**
   * 每个子组件是否处于拖拽状态
   */
  activeId: UniqueIdentifier;
  /**
   * 拖拽组件处于的容器Id
   */
  container: UniqueIdentifier;
  /**
   * 拖拽元素记录中心
   */
  manager: Manager;
  /**
   * 当前拖拽元素的偏移值
   */
  transform: Coordinate;
  /**
   * 事件触发
   */
  activator: Activator | null;
}

export type ActionType =
  | {
      type: DragActionEnum.SET_CONTAINER;
      payload: {
        container: UniqueIdentifier;
      };
    }
  | {
      type: DragActionEnum.ACTIVATED;
      payload: {
        activeId: UniqueIdentifier;
      };
    }
  | {
      type: DragActionEnum.INACTIVATED;
    }
  | {
      type: DragActionEnum.PUSH_NODE;
      payload: { node: DraggableNode; type: 'draggables' | 'droppables' };
    }
  | {
      type: DragActionEnum.REMOVE_NODE;
      payload: { id: UniqueIdentifier; type: 'draggables' | 'droppables' };
    }
  | {
      type: DragActionEnum.TRANSFORM;
      payload: {
        transform: Coordinate;
      };
    };

export interface DndContextDescriptor extends State {
  droppableRects: DroppableRectMap;
  updateDroppableRects: () => void;
  dispatch: Dispatch<ActionType>;
  overNodeRef: MutableRefObject<Data | undefined>;
  hasDragOverlay: boolean;
}

export interface DndContextProps {
  children: ReactNode;
  DragOverlay?: ElementType;
  sensor?: Sensor;
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}
