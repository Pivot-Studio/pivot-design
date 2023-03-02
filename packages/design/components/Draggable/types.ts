import React, { MutableRefObject } from 'react';
import { DragEndEvent } from './sensors/events';
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
  // node position information
  clientRect?: DOMRect;
  transform?: Coordinate;
  transition?: boolean;
};

export interface DndContextProps {
  children: React.ReactNode;
  sensor?: Sensor;
  onDragEnd?: (event: DragEndEvent) => void;
  sortable?: boolean;
}
