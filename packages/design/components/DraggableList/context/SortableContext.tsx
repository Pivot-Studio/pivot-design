import { useEffect, useReducer, useRef, useState } from 'react';
import { MouseSensor } from '../sensors';
import { SortableContextProps } from '../types';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { Activator, DragActionEnum, SortableContextDescriptor } from './types';
const defaultSensor = MouseSensor;
export function SortableContext({ children, sensor: Sensor = defaultSensor }: SortableContextProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { manager } = state;
  const [activator, setActivator] = useState<Activator | null>(null);
  const activeRectRef = useRef<SortableContextDescriptor['activeRect']['current']>({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const listenerRef = useRef(new Listeners(window));
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
      onEnd() {
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
    // listenerRef.current.add('mousedown', (event: MouseEvent) => {
    //   sensorInstance.handleStart(event);
    // });
    return () => {
      listenerRef.current.removeAll();
    };
  }, [Sensor, manager]);

  const initialContextValue: SortableContextDescriptor = {
    ...state,
    dispatch,
    activator,
    activeRect: activeRectRef,
  };
  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
}
