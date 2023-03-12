import { Dispatch, MutableRefObject, ReactNode } from 'react';
import { DragEndEvent } from '../sensors/events';
import { Sensor } from '../sensors/mouse/types';
import { Coordinate, DraggableNode, UniqueIdentifier } from '../types';
import { Collision } from '../utils/collisionDetection';
import Manager from './manager';

export enum DragActionEnum {
  ACTIVATED,
  INACTIVATED,
  PUSH_NODE,
  REMOVE_NODE,
  TRANSFORM,
}
export interface Activator {
  eventName: string;
  handler: (event: Event, id: UniqueIdentifier) => void;
}

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
      type: DragActionEnum.ACTIVATED;
      payload: {
        activeId: UniqueIdentifier;
        container: UniqueIdentifier;
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
        container: UniqueIdentifier;
      };
    };

export interface DndContextDescriptor extends State {
  dispatch: Dispatch<ActionType>;
  activeRect: MutableRefObject<{
    initOffset: Coordinate | null;
    marginRect: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    } | null;
    clientRect: DOMRect | null;
  }> | null;
  collisions: MutableRefObject<Collision[]> | null;
  sortable?: {
    direction: 'vertical' | 'horizen';
  };
}

export interface DndContextProps {
  children: ReactNode;
  sensor?: Sensor;
  // todo
  onDragMove?: (event: any) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  sortable?: {
    direction: 'vertical' | 'horizen';
  };
}
