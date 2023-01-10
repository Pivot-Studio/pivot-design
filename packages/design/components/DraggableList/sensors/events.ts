import { Coordinate } from '../types';

export interface DragEvent {
  activeEvent: Event;
  delta: Coordinate;
}
