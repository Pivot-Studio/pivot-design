import Manager from '../../context/manager';
import { UniqueIdentifier } from '../../types';
import { Listeners } from '../../utils';
import { Coordinate } from '../../../utils/types';
import { MouseSensor } from '.';
import { internalDragEndEvent } from '../events';
import { Collision } from '../../utils/collisionDetection';
import { MutableRefObject } from 'react';
export { Collision } from '../../utils/collisionDetection';
export interface MouseSensorProps {
  eventName?: string;
  manager: Manager;
  listener: Listeners;
  onStart(
    activeId: UniqueIdentifier,
    activeRect: {
      initOffset?: Coordinate;
      marginRect?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
      };
      clientRect?: DOMRect;
    }
  ): void;
  onMove(coordinates: Coordinate, id: UniqueIdentifier): void;
  onEnd(event: internalDragEndEvent): void;
}
export interface Sensor {
  eventName: string;
  new (props: MouseSensorProps): MouseSensor;
}
