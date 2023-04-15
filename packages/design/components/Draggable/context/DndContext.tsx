import { useEffect, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { DndContextProps } from './types';
import { collisionDetection } from '../utils/collisionDetection';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, DndContextDescriptor } from './types';
// import { sortableRectify } from '../strategies/SortableRectify';
import { Data, UniqueIdentifier } from '../types';
import { useEvent } from '../hooks/useEvent';
import { useMeasureDroppableContainer } from '../hooks/useMeasureDroppableContainer';

const defaultSensor = MouseSensor;

export function DndContext({
  children,
  sensor: Sensor = defaultSensor,
  onDragStart,
  onDragMove,
  onDragEnd,
  DragOverlay,
}: DndContextProps) {
  const hasDragOverlay = Boolean(DragOverlay);
  // Avoid multiple contexts using the same state
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { manager, transform, activeId, container } = state;
  // event instances
  const [activator, setActivator] = useState<Activator | null>(null);
  // activeNoede origin information on Start
  const activeRectRef: DndContextDescriptor['activeRect'] = useRef(null);
  const listenerRef = useRef(new Listeners(window));
  const overNodeRef = useRef<Data>();
  const sensorRef = useRef<any>(null);

  // The location of the droppable elemenets is recalculated only if the activeId changes
  // 【🌟】used by collisions detections & sortable calculation
  const droppableRects = useMeasureDroppableContainer(manager, activeId);

  const handleDragMove = useEvent((transform, id) => {
    let currentContainer: UniqueIdentifier = '';
    // Collision Detection
    if (id && activeRectRef.current) {
      const coordinates = {
        x: (activeRectRef.current.initOffset?.x ?? 0) + transform.x,
        y: (activeRectRef.current.initOffset?.y ?? 0) + transform.y,
      };
      const collisions = collisionDetection({
        activeId: id,
        manager,
        coordinates,
        droppableRects,
      });
      for (let collision of collisions) {
        if (collision.data.current && collision.data.current['type'] === 'container') {
          currentContainer = collision.id;
        } else if (collision.data.current && collision.data.current['sortable']) {
          overNodeRef.current = collision.data.current;
        }
      }
      onDragMove &&
        onDragMove({
          overNode: overNodeRef,
          activeNode: manager.getNode(id, 'draggables')?.data,
          container: currentContainer,
        });
      dispatch({
        type: DragActionEnum.TRANSFORM,
        payload: {
          transform,
          container: currentContainer,
        },
      });
    }
  });
  const handleDragEnd = useEvent((event) => {
    onDragEnd &&
      onDragEnd({
        ...event,
        overNode: overNodeRef.current,
        activeNode: manager.getNode(event.id, 'draggables')?.data.current,
        id: event.id,
        isDrop: !!container,
      });
    dispatch({
      type: DragActionEnum.INACTIVATED,
    });
    dispatch({
      type: DragActionEnum.TRANSFORM,
      payload: {
        transform: {
          x: 0,
          y: 0,
        },
        container: '',
      },
    });
  });
  const handleDragStart = useEvent((activeId, activeRect) => {
    const { initOffset, clientRect, marginRect } = activeRect;
    activeRectRef.current = {
      initOffset,
      clientRect,
      marginRect,
    };
    overNodeRef.current = manager.getNode(activeId, 'draggables')!.data.current;
    // resolved：解决Safari中使用useEffect获取Rect时候是基于整个滚动页面来计算的问题，使得不同浏览器不兼容
    //，每次点击时候都重新计算一下初始位置
    // resolved: Safari is using useEffect to retrieve rects based on the entire scroll page, making them incompatible with browsers
    //, recalculate the initial position each time you click
    for (let d of manager.getAll('draggables')) {
      if (d.clientRect) d.clientRect.current = d.node.current?.getBoundingClientRect();
    }
    dispatch({
      type: DragActionEnum.ACTIVATED,
      payload: { activeId, container: container },
    });
    onDragStart && onDragStart({ activeId });
  });

  useEffect(() => {
    // 【fuck useEffect!!】Since the Sensor is registered during initialization, all parameters that need to be modified later
    // must be maintained inside the Sensor; otherwise, they cannot be passed into the Context
    // 💚【useEvent】useEvent can resolve this problem

    sensorRef.current = new Sensor({
      manager,
      listener: listenerRef.current,
      onStart: handleDragStart,
      onMove: handleDragMove,
      onEnd: handleDragEnd,
    });
    // set activate event to binding with clicked element
    setActivator({
      eventName: Sensor.eventName,
      handler: sensorRef.current.handleStart,
    });
  }, []);

  const initialContextValue: DndContextDescriptor = {
    ...state,
    droppableRects,
    dispatch,
    overNodeRef,
    hasDragOverlay,
    activator,
    activeRect: activeRectRef,
  };

  return (
    <Context.Provider value={initialContextValue}>
      {children}
      {DragOverlay && activeId ? (
        <DragOverlay
          index={manager.getNode(activeId, 'draggables')?.data.current?.['sortable']?.index ?? -1}
          id={activeId}
          containerId={container}
          x={activeRectRef.current!.clientRect!.left + transform.x}
          y={activeRectRef.current!.clientRect!.top + transform.y}
        />
      ) : null}
    </Context.Provider>
  );
}
