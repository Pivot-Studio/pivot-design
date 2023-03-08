import { Coordinate, DraggableNode } from '../types';

export interface DragEvent {
  nativeEvent: Event;
  delta: Coordinate;
}
export interface internalDragEndEvent extends DragEvent {
  id: number | string;
  isDrop: boolean;
}
export interface DragEndEvent extends DragEvent {
  id: number | string;
  activeNode: DraggableNode;
  overNode: DraggableNode;
  isDrop: boolean;
}
