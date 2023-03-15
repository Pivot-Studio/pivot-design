import { Listeners } from '../../utils';
import { Coordinate, UniqueIdentifier } from '../../types';
import { getEventCoordinates } from '../../../utils';
import { getElementMargin } from '../../utils';
import Manager from '../../context/manager';
import { Collision, MouseSensorProps } from './types';
import { getOwnerDocument } from '../../../utils';
import { MutableRefObject } from 'react';

const EVENTS = {
  start: ['mousedown'],
  move: ['mousemove'],
  end: ['mouseup'],
};
export class MouseSensor {
  static eventName = 'onMouseDown';
  private windowListeners: Listeners;
  private manager: Manager;
  private collisions: MutableRefObject<Collision[]>;
  private document!: Document;
  private transform!: Coordinate;
  private activeId!: UniqueIdentifier;
  private initOffset!: Coordinate | null;
  private clientRect!: DOMRect | null;
  private marginRect!: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null;
  constructor(private props: MouseSensorProps) {
    const { manager, listener, collisions } = props;
    this.manager = manager;
    this.windowListeners = listener;
    this.collisions = collisions;
    this.reset();
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    EVENTS.move.forEach((eventName) => {
      this.windowListeners.add(eventName, this.handleMove);
    });
    EVENTS.end.forEach((eventName) => {
      this.windowListeners.add(eventName, this.handleEnd);
    });
  }
  // TODO 完成一个抽象的类，具体的start又外面实现并传入给draggableItem。move和end又外面传入事件名
  handleStart(event: Event, id: UniqueIdentifier) {
    const { onStart } = this.props;
    event.stopPropagation();
    this.activeId = id;
    this.document = getOwnerDocument(event.target);
    // Remove any text selection from the document
    this.removeTextSelection();

    // Prevent further text selection while dragging
    this.windowListeners.add('selectionchange', this.removeTextSelection);
    // Resolved cursor error when mouse moving over Safari
    this.windowListeners.add('selectstart', (e) => e.preventDefault());

    const activeNodeDescriptor = this.manager.getNode(id, 'draggables');

    if (activeNodeDescriptor) {
      const activeNode = activeNodeDescriptor.node.current!;
      this.initOffset = getEventCoordinates(event);
      this.clientRect = activeNode.getBoundingClientRect();
      this.marginRect = getElementMargin(activeNode);
      // activeNodeDescriptor.clientRect = this.clientRect;

      onStart(id, {
        initOffset: this.initOffset,
        marginRect: this.marginRect,
        clientRect: this.clientRect,
      });
    }
  }
  private handleMove(event: MouseEvent) {
    if (!this.activeId) return;
    const { onMove } = this.props;

    const currentCoordinates = getEventCoordinates(event)!;
    const transform = {
      x: currentCoordinates.x - this.initOffset!.x,
      y: currentCoordinates.y - this.initOffset!.y,
    };
    this.transform = transform;
    onMove(transform, this.activeId);
  }
  private handleEnd(event: Event) {
    if (!this.activeId) return;
    const { onEnd } = this.props;
    for (let draggable of this.manager.getAll('draggables')) {
      draggable.transform = {
        x: 0,
        y: 0,
      };
      draggable.transition = false;
    }
    this.windowListeners.remove('selectstart');
    onEnd({ nativeEvent: event, delta: this.transform, id: this.activeId, isDrop: this.collisions.current.length > 0 });
    this.reset();
  }
  private reset() {
    this.activeId = '';
    this.initOffset = null;
    this.clientRect = null;
    this.marginRect = null;
    this.transform = {
      x: 0,
      y: 0,
    };
  }
  private removeTextSelection() {
    this.document.getSelection()?.removeAllRanges();
  }
}
