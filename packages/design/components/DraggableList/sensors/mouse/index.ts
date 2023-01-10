import { Listeners } from '../../utils';
import { Coordinate, DragNode, UniqueIdentifier } from '../../types';
import { getEventCoordinates } from '../../../utils';
import { getElementMargin } from '../../utils';
import Manager from '../../context/manager';
import { MouseSensorProps } from './types';

const EVENTS = {
  start: ['mousedown'],
  move: ['mousemove'],
  end: ['mouseup'],
};
export class MouseSensor {
  private windowListeners: Listeners;
  private manager: Manager;
  private initOffset!: Coordinate | null;
  private clientRect!: DOMRect | null;
  private activeId!: UniqueIdentifier;
  private marginRect!: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  } | null;
  constructor(private props: MouseSensorProps) {
    const { manager, listener } = props;
    this.manager = manager;
    this.windowListeners = listener;
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
  handleStart(event: Event) {
    const { onStart } = this.props;
    const node = event.target as DragNode;
    const activeId = node.dragitemid;
    this.activeId = activeId;
    const activeNodeDescriptor = !!activeId && this.manager.getActiveNode(activeId);
    if (activeNodeDescriptor) {
      const activeNode = activeNodeDescriptor.node.current!;
      this.initOffset = getEventCoordinates(event);
      this.clientRect = activeNode.getBoundingClientRect();
      this.marginRect = getElementMargin(activeNode);
      activeNodeDescriptor.clientRect = this.clientRect;
      onStart(activeId, {
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
    onMove(transform);
  }
  private handleEnd(event: MouseEvent) {
    if (!this.activeId) return;
    event.stopPropagation();
    this.reset();
    const { onEnd } = this.props;
    onEnd();
  }
  private reset() {
    this.activeId = '';
    this.initOffset = null;
    this.clientRect = null;
    this.marginRect = null;
  }
}
