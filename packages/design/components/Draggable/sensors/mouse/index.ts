import { Listeners } from '../../utils';
import { Coordinate, UniqueIdentifier } from '../../types';
import { getEventCoordinates } from '../../../utils';
import { getElementMargin } from '../../utils';
import Manager from '../../context/manager';
import { MouseSensorProps } from './types';
import { getOwnerDocument } from '../../../utils';

const EVENTS = {
  start: ['mousedown'],
  move: ['mousemove'],
  end: ['mouseup'],
};
export class MouseSensor {
  static eventName = 'onMouseDown';
  private windowListeners: Listeners;
  private manager: Manager;
  private document!: Document;
  private transform!: Coordinate;
  private activeId!: UniqueIdentifier;
  private initOffset?: Coordinate;
  private clientRect?: DOMRect;
  private marginRect?: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  constructor(private props: MouseSensorProps) {
    const { manager, listener } = props;
    this.manager = manager;
    this.windowListeners = listener;
    this.reset();
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
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
    EVENTS.move.forEach((eventName) => {
      this.windowListeners.add(eventName, this.handleMove);
    });
    EVENTS.end.forEach((eventName) => {
      this.windowListeners.add(eventName, this.handleEnd);
    });
    const activeNodeDescriptor = this.manager.getNode(id, 'draggables');

    if (activeNodeDescriptor && activeNodeDescriptor.node.current) {
      const activeNode = activeNodeDescriptor.node.current;

      this.clientRect = activeNodeDescriptor.clientRect?.current;
      this.initOffset = getEventCoordinates(event) as Coordinate;
      this.marginRect = getElementMargin(activeNode);

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
    this.windowListeners.removeAll();
    onEnd({ nativeEvent: event, delta: this.transform, id: this.activeId });
    this.reset();
  }
  private reset() {
    this.activeId = '';
    this.initOffset = undefined;
    this.clientRect = undefined;
    this.marginRect = undefined;
    this.transform = {
      x: 0,
      y: 0,
    };
  }
  private removeTextSelection() {
    this.document.getSelection()?.removeAllRanges();
  }
}
