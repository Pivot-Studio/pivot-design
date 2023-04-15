import { SortableData } from '../Sortable/strategies/types';
import { Coordinate, Data } from '../types';

export interface DragEvent {
  nativeEvent: Event;
  delta: Coordinate;
}
export interface internalDragEndEvent extends DragEvent {
  id: number | string;
}

export interface DragStartEvent {
  id: number | string;
  nativeEvent: Event;
}
export interface DragMoveEvent extends DragEvent {
  active?: Data;
  over?: Data;
  container?: number | string;
}
export interface DragEndEvent extends DragEvent {
  id: number | string;
  active: Data<SortableData['sortable']>;
  over: Data<SortableData['sortable']>;
  isDrop: boolean;
}
