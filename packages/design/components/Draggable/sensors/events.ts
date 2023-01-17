import { Coordinate } from '../types';

export interface DragEvent {
  activeEvent: Event;
  delta: Coordinate;
}
export interface internalDragEndEvent extends DragEvent {
  id: number | string;
}
export interface DragEndEvent extends DragEvent {
  id: number | string;
  newIndex: number;
  oldIndex: number;
}
