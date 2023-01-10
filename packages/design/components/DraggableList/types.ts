import React, { MutableRefObject } from 'react';
import { Sensor } from './sensors/mouse/types';

export type UniqueIdentifier = number | string;

export interface Coordinate {
  x: number;
  y: number;
}

export interface DragNode extends HTMLElement {
  dragitemid: UniqueIdentifier;
}
export type DraggableNode = {
  id: UniqueIdentifier;
  index: number;
  node: MutableRefObject<DragNode | undefined>;
  // cache position
  clientRect?: DOMRect;
  transform?: Coordinate;
  // key: UniqueIdentifier;
  // activatorNode: MutableRefObject<HTMLElement | null>;
  // data: DataRef;
};

export interface SortableContextProps {
  children: React.ReactNode;
  sensor: Sensor;
}
