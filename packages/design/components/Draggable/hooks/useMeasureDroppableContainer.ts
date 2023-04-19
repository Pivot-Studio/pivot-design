import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import Manager from '../context/manager';
import { Coordinate, UniqueIdentifier } from '../types';
import { collisionDetection } from '../utils/algorithm/collisionDetection';
import { useLatestValue } from './useLastValue';

export const useMeasureDroppableContainer = (
  manager: Manager,
  activeId: UniqueIdentifier,
  activeRectRef: MutableRefObject<{ initOffset: Coordinate; clientRect: DOMRect } | null>,
  transform: Coordinate
) => {
  // Maintain a droppableMap that is recomputed only when the activeId changes
  // 维护一个只在activeId发生改变的时候才会重新计算的droppableMap
  // useEffect 异步执行在所有逻辑处理之后，页面渲染结束之后
  const prevId = useLatestValue(activeId);
  const droppableMapRef = useRef(new Map());
  const needUpdateDroppableMap = useRef(false);
  const updateDroppableRects = useCallback(() => {
    needUpdateDroppableMap.current = true;
  }, []);
  return useMemo(() => {
    if (!activeId || !activeRectRef?.current) {
      return { droppableRects: new Map(), collisions: [], container: '', over: {}, updateDroppableRects };
    }
    let currentContainer: UniqueIdentifier = '';
    let over = undefined;

    if (activeId !== prevId.current || needUpdateDroppableMap.current) {
      droppableMapRef.current = new Map();
      const droppableContainers = manager
        .getAll('droppables')
        .sort((a, b) => a.data['sortable']?.index - b.data['sortable']?.index);
      droppableContainers.forEach((droppable) => {
        const container = droppable.data['sortable']?.containerId || droppable.id;
        if (droppableMapRef.current.has(container)) {
          droppableMapRef.current.get(container).push({
            clientRect: droppable.node.current!.getBoundingClientRect(),
            id: droppable.id,
          });
        } else {
          droppableMapRef.current.set(container, [
            {
              clientRect: droppable.node.current!.getBoundingClientRect(),
              id: droppable.id,
            },
          ]);
        }
      });
      needUpdateDroppableMap.current = false;
    }

    const collisions = collisionDetection({
      activeId,
      manager,
      coordinates: {
        x: activeRectRef.current.initOffset.x + transform.x,
        y: activeRectRef.current.initOffset.y + transform.y,
      },
      droppableRects: droppableMapRef.current,
    });

    for (let collision of collisions) {
      if (collision.data && collision.data['type'] === 'container') {
        currentContainer = collision.id;
      } else if (collision.data && collision.data['sortable']) {
        over = collision.data;
      }
    }

    return {
      droppableRects: droppableMapRef.current,
      collisions,
      over,
      container: currentContainer,
      updateDroppableRects,
    };
  }, [activeId, manager, transform]);
};
