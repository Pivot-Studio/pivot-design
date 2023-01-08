import { Dispatch, MutableRefObject } from 'react';
import { Coordinate, DraggableNode, UniqueIdentifier } from '../types';
import Manager from './manager';

export enum DragActionEnum {
  ACTIVATED,
  INACTIVATED,
  PUSH_NODE,
  TRANSFORM,
}
export interface State {
  /**
   * 每个子组件是否处于拖拽状态
   */
  activeId: UniqueIdentifier;
  /**
   * 拖拽元素记录中心
   */
  manager: Manager;
  /**
   * 当前拖拽元素的偏移值
   */
  transform: Coordinate;
}

export type ActionType =
  | {
      type: DragActionEnum.ACTIVATED;
      payload: UniqueIdentifier;
    }
  | {
      type: DragActionEnum.INACTIVATED;
    }
  | {
      type: DragActionEnum.PUSH_NODE;
      payload: DraggableNode;
    }
  | {
      type: DragActionEnum.TRANSFORM;
      payload: Coordinate;
    };

export interface SortableContextDescriptor extends State {
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
  }>;
}
