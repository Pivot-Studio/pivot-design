import Manager from '../../context/manager';
import { UniqueIdentifier } from '../../types';
import { Listeners } from '../../utils';
import { Coordinate } from '../../../utils/types';
import { MouseSensor } from '.';
import { internalDragEndEvent } from '../events';
export { Collision } from '../../utils/algorithm/collisionDetection';
export interface MouseSensorProps {
  eventName?: string;
  manager: Manager;
  listener: Listeners;
  onStart(
    event: Event,
    activeId: UniqueIdentifier,
    activeRect: {
      initOffset?: Coordinate;
      clientRect?: DOMRect;
    }
  ): void;
  onMove(coordinates: Coordinate, id: UniqueIdentifier, event: Event): void;
  onEnd(event: internalDragEndEvent): void;
}
export interface Sensor {
  eventName: string;
  new (props: MouseSensorProps): MouseSensor;
}
