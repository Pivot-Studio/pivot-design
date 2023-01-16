import { useEffect, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { SortableContextProps } from '../types';
import { rectSortStrategy } from '../utils/animationCollisions';
import { collisionDetection } from '../utils/collisionDetection';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, SortableContextDescriptor } from './types';

const defaultSensor = MouseSensor;

export function SortableContext({
  children,
  sensor: Sensor = defaultSensor,
  onDragEnd,
  sortable,
}: SortableContextProps) {
  // Avoid multiple contexts using the same state
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { manager, transform, activeId } = state;
  const [activator, setActivator] = useState<Activator | null>(null);
  // origin information on Start
  const activeRectRef: SortableContextDescriptor['activeRect'] = useRef({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const listenerRef = useRef(new Listeners(window));
  const newIndexRef = useRef<number>(0);
  if (activeId && sortable) {
    // TODO: 覆盖功能
    const collisions = collisionDetection({
      activeId,
      manager,
      coordinates: {
        x: (activeRectRef.current.initOffset?.x ?? 0) + transform.x,
        y: (activeRectRef.current.initOffset?.y ?? 0) + transform.y,
      },
    });
    // TODO: sort strategy 适配
    newIndexRef.current = rectSortStrategy({ manager, transform, activeId, margin: activeRectRef.current.marginRect! });
  }

  useEffect(() => {
    const sensorInstance = new Sensor({
      manager,
      listener: listenerRef.current,
      onStart: (activeId, activeRect) => {
        const { initOffset, clientRect, marginRect } = activeRect;
        activeRectRef.current = {
          initOffset,
          clientRect,
          marginRect,
        };
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
            newIndex: newIndexRef.current,
            oldIndex: manager.getActiveNode(event.id)!.index,
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
    setActivator({
      eventName: 'onMouseDown',
      handler: sensorInstance.handleStart,
    });
    return () => {
      listenerRef.current.removeAll();
    };
  }, [Sensor, manager, onDragEnd]);

  const initialContextValue: SortableContextDescriptor = {
    ...state,
    dispatch,
    sortable,
    activator,
    activeRect: activeRectRef,
  };
  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
}
