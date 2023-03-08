import { useEffect, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { DndContextProps } from './types';
import { Collision, collisionDetection } from '../utils/collisionDetection';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, DndContextDescriptor } from './types';
import { sortableRectify } from '../strategies/SortableRectify';
import { DraggableNode } from '../types';

const defaultSensor = MouseSensor;

export function DndContext({ children, sensor: Sensor = defaultSensor, onDragEnd, sortable }: DndContextProps) {
  // Avoid multiple contexts using the same state
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { manager, transform, activeId } = state;
  const [activator, setActivator] = useState<Activator | null>(null);
  // origin information on Start
  const activeRectRef: DndContextDescriptor['activeRect'] = useRef({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const collisionsRef = useRef<Collision[]>([]);
  const listenerRef = useRef(new Listeners(window));
  const overNodeRef = useRef<DraggableNode>();

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

    if (sortable) {
      // todo
      sortableRectify({ manager, transform, activeId, sortable, overNodeRef, coordinates });
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
        overNodeRef.current = manager.getNode(activeId, 'draggables')!;
        dispatch({
          type: DragActionEnum.ACTIVATED,
          payload: activeId,
        });
      },
      onMove(coordinates) {
        dispatch({
          type: DragActionEnum.TRANSFORM,
          payload: coordinates,
        });
      },
      onEnd(event) {
        onDragEnd &&
          onDragEnd({
            ...event,
            overNode: overNodeRef.current!,
            activeNode: manager.getNode(event.id, 'draggables')!,
            id: event.id,
            isDrop: event.isDrop,
          });
        dispatch({
          type: DragActionEnum.INACTIVATED,
        });
        dispatch({
          type: DragActionEnum.TRANSFORM,
          payload: {
            x: 0,
            y: 0,
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
  }, [Sensor, manager, onDragEnd]);

  const initialContextValue: DndContextDescriptor = {
    ...state,
    dispatch,
    collisions: collisionsRef,
    sortable,
    activator,
    activeRect: activeRectRef,
  };
  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
}
