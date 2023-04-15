import { MutableRefObject } from 'react';

export type UniqueIdentifier = number | string;

type AnyData = Record<string, any>;

export type Data<T = AnyData> = T & AnyData;

export type DataRef<T = AnyData> = MutableRefObject<Data<T> | undefined>;

export interface Coordinate {
  x: number;
  y: number;
}

// todo：will deprecated
export interface DragNode extends HTMLElement {
  dragitemid: UniqueIdentifier;
}

export type DraggableNode = {
  id: UniqueIdentifier;
  // custom data：
  // like Droppable: data = { type:string; }
  // like Sortable: data = { sortable: { containerId, index, items }}
  data: Data;
  node: MutableRefObject<DragNode | undefined>;
  // node position information
  clientRect?: MutableRefObject<DOMRect | undefined>;
  transform?: Coordinate;
  transition?: boolean;
};

export type noop = (...args: any[]) => void;
