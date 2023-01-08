import { getEventCoordinates } from '../../utils/getEventCoordinates';
import { useEffect, useReducer, useRef } from 'react';
import { DragNode, SortableContextProps } from '../types';
import { closest, getElementMargin } from '../utils';
import { Listeners } from '../utils/Listener';
import { Context } from './context';
import { initialState, reducer } from './reducer';
import { DragActionEnum, SortableContextDescriptor } from './types';

export function SortableContext({ children }: SortableContextProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { manager, activeId } = state;
  const activeRectRef = useRef<SortableContextDescriptor['activeRect']['current']>({
    initOffset: null,
    marginRect: null,
    clientRect: null,
  });
  const listenerRef = useRef(new Listeners(window));
  const isActiveRef = useRef(false);
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      event.stopPropagation();
      if (!isActiveRef.current) return;
      const currentCoordinates = getEventCoordinates(event)!;
      const transform = {
        x: currentCoordinates.x - activeRectRef.current.initOffset!.x,
        y: currentCoordinates.y - activeRectRef.current.initOffset!.y,
      };
      dispatch({
        type: DragActionEnum.TRANSFORM,
        payload: transform,
      });
    };
    const handleEnd = (event: MouseEvent) => {
      event.stopPropagation();
      isActiveRef.current = false;
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
      listenerRef.current.removeAll();
    };
    listenerRef.current.add(
      'mousedown',
      (event) => {
        event.stopPropagation();
        const node = closest(event.target as DragNode, (n: DragNode) => !!n.dragitemid);
        if (node) {
          const activeId = node.dragitemid;
          const activeNodeDescriptor = !!activeId && manager.getActiveNode(activeId);
          if (activeNodeDescriptor) {
            const activeNode = activeNodeDescriptor.node.current!;
            const initOffset = getEventCoordinates(event);
            const clientRect = activeNode.getBoundingClientRect();
            activeNodeDescriptor.clientRect = clientRect;
            const marginRect = getElementMargin(activeNode);
            dispatch({
              type: DragActionEnum.ACTIVATED,
              payload: activeId,
            });
            activeRectRef.current = {
              initOffset,
              clientRect,
              marginRect,
            };
            isActiveRef.current = true;
            listenerRef.current.add('mousemove', handleMove);
            listenerRef.current.add('mouseup', handleEnd);
          }
        }
      },
      {
        passive: true,
      }
    );
    return () => {
      listenerRef.current.remove('mousedown');
    };
  }, [activeId, manager]);

  const initialContextValue: SortableContextDescriptor = {
    ...state,
    dispatch,
    activeRect: activeRectRef,
  };
  return <Context.Provider value={initialContextValue}>{children}</Context.Provider>;
}
