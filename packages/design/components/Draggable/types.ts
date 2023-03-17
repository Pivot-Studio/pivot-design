import { MutableRefObject } from 'react';

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

export type noop = (...args: any[]) => void;
