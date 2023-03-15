import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { DndContextProps } from './types';
import { Collision, collisionDetection } from '../utils/collisionDetection';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, DndContextDescriptor } from './types';
import { sortableRectify } from '../strategies/SortableRectify';
import { Data, UniqueIdentifier } from '../types';

const defaultSensor = MouseSensor;

export function DndContext({
  children,
  items: propsItems = [],
  sensor: Sensor = defaultSensor,
  onDragStart,
  onDragMove,
  onDragEnd,
  hasDragOverlay = false,
  DragOverlay,
  sortable,
}: DndContextProps) {
  // Avoid multiple contexts using the same state
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { manager, transform, activeId, container } = state;
  const [activator, setActivator] = useState<Activator | null>(null);
  // origin information on Start
  const activeRectRef: DndContextDescriptor['activeRect'] = useRef({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const collisionsRef = useRef<Collision[]>([]);
  const containerRef = useRef<number | string>('');
  const listenerRef = useRef(new Listeners(window));
  const overNodeRef = useRef<Data>(null as unknown as Data);
  const previousItemsRef = useRef<UniqueIdentifier[]>([]);
  const items = useMemo<UniqueIdentifier[]>(() => {
    return propsItems.map((item: any) => (typeof item === 'object' && item.id ? item.id : item));
  }, [propsItems]);

  useEffect(() => {
    previousItemsRef.current = items;
  }, [items]);

  if (activeId) {
    // TODO: 覆盖功能
    const coordinates = {
      x: (activeRectRef.current.initOffset?.x ?? 0) + transform.x,
      y: (activeRectRef.current.initOffset?.y ?? 0) + transform.y,
    };
    const collisions = collisionDetection({
      activeId,
      manager,
      coordinates,
    });
    collisionsRef.current = collisions;
    for (let collision of collisionsRef.current) {
      if (collision.data.current!['sortable'].type === 'container') {
        containerRef.current = collision.id;
      }
    }
    if (sortable) {
      sortableRectify({
        manager,
        transform,
        activeId,
        sortable,
        overNodeRef,
        coordinates,
        collisionsRef,
        containerRef,
      });
    }
  }

  useEffect(() => {
    const sensorInstance = new Sensor({
      manager,
      listener: listenerRef.current,
      collisions: collisionsRef,
      onStart: (activeId, activeRect) => {
        const { initOffset, clientRect, marginRect } = activeRect;
        activeRectRef.current = {
          initOffset,
          clientRect,
          marginRect,
        };
        overNodeRef.current = manager.getNode(activeId, 'draggables')!.data.current!;
        // resolved：解决Safari中使用useEffect获取Rect时候是基于整个滚动页面来计算的问题，使得不同浏览器不兼容
        //，每次点击时候都重新计算一下初始位置
        for (let d of manager.getAll('draggables')) {
          if (d.clientRect) d.clientRect.current = d.node.current?.getBoundingClientRect();
        }
        dispatch({
          type: DragActionEnum.ACTIVATED,
          payload: { activeId, container: containerRef.current },
        });
        onDragStart && onDragStart({ activeId });
      },
      onMove(coordinates, id) {
        onDragMove &&
          onDragMove({
            overNode: overNodeRef,
            activeNode: manager.getNode(id, 'draggables')?.data,
            container: containerRef.current,
          });
        dispatch({
          type: DragActionEnum.TRANSFORM,
          payload: {
            transform: coordinates,
            container: containerRef.current,
          },
        });
      },
      onEnd(event) {
        collisionsRef.current = [];
        containerRef.current = '';
        onDragEnd &&
          onDragEnd({
            ...event,
            overNode: overNodeRef,
            activeNode: manager.getNode(event.id, 'draggables')?.data,
            id: event.id,
            isDrop: event.isDrop,
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
            container: containerRef.current,
          },
        });
      },
    });
    // set activate event to binding with clicked element
    setActivator({
      eventName: Sensor.eventName,
      handler: sensorInstance.handleStart,
    });
    return () => {
      listenerRef.current.removeAll();
    };
  }, [Sensor, manager, onDragEnd, onDragMove]);

  const initialContextValue: DndContextDescriptor = {
    ...state,
    dispatch,
    collisions: collisionsRef,
    sortable,
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
        />
      ) : null}
    </Context.Provider>
  );
}
