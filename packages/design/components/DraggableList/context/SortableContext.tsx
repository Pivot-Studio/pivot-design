import { useEffect, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { SortableContextProps } from '../types';
import { collisionDetection } from '../utils/collisionDetection';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, SortableContextDescriptor } from './types';

const defaultSensor = MouseSensor;

export function SortableContext({ children, sensor: Sensor = defaultSensor, onDragEnd }: SortableContextProps) {
  // Avoid multiple contexts using the same state
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const { manager, transform } = state;
  const [activator, setActivator] = useState<Activator | null>(null);
  // origin information on Start
  const activeRectRef: SortableContextDescriptor['activeRect'] = useRef({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const listenerRef = useRef(new Listeners(window));
  collisionDetection({
    manager,
    coordinates: {
      x: activeRectRef.current.clientRect?.left ?? 0 + transform.x,
      y: activeRectRef.current.clientRect?.top ?? 0 + transform.y,
    },
  });
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
        onDragEnd && onDragEnd(event);
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
    activator,
    activeRect: activeRectRef,
  };
  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
}
