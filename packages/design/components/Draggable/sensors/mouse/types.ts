import Manager from '../../context/manager';
import { UniqueIdentifier } from '../../types';
import { Listeners } from '../../utils';
import { Coordinate } from '../../../utils/types';
import { MouseSensor } from '.';
import { internalDragEndEvent } from '../events';

export interface MouseSensorProps {
  eventName?: string;
  manager: Manager;
  listener: Listeners;
  onStart(
    activeId: UniqueIdentifier,
    activeRect: {
      initOffset: Coordinate | null;
      marginRect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
      } | null;
      clientRect: DOMRect | null;
    }
  ): void;
  onMove(coordinates: Coordinate): void;
  onEnd(event: internalDragEndEvent): void;
}
export interface Sensor {
  new (props: MouseSensorProps): MouseSensor;
}
