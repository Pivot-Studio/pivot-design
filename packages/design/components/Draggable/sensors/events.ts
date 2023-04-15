import { Coordinate, DataRef } from '../types';

export interface DragEvent {
  nativeEvent: Event;
  delta: Coordinate;
}
export interface internalDragEndEvent extends DragEvent {
  id: number | string;
}
export interface DragEndEvent extends DragEvent {
  id: number | string;
  activeNode?: DataRef;
  overNode?: DataRef;
  isDrop: boolean;
}
