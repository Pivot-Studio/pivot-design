import React, { useContext, useEffect, useRef } from 'react';
import { DraggableListProps } from 'pivot-design-props';
import { prefix } from '../constants';
import { Context, SortableContext } from './utils/context';
import classnames from 'classnames';
import DraggableItem from './DraggableItem';
import './DraggableList.scss';
import {
  closest,
  getElementMargin,
  getPositionFromEvent,
  setInlineStyles,
  setTransitionDuration,
  setTranslate3d,
} from './utils';
import { DraggableNode, DragNode } from './utils/type';
const EVENTS = {
  end: ['touchend', 'touchcancel', 'mouseup'],
  move: ['touchmove', 'mousemove'],
  start: ['touchstart', 'mousedown'],
};
function DraggableList(props: DraggableListProps) {
  const { className, style, transitionDuration = 300, onDragEnd, children } = props;

  let { node: draggableNodes, setActiveId, activeId } = useContext(Context);
  /**
   *
   */
  const dragListRef = useRef<HTMLDivElement>(null);
  /**
   * 克隆节点
   */
  const helper = useRef<HTMLElement>();
  const activeNodeRef = useRef<DraggableNode>();
  /**
   * 激活节点的margin
   */
  const activeNodeMargin = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
  /**
   * start事件时的坐标
   */
  const initOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  /**
   * start事件触发标识
   */
  const touched = useRef(false);
  const oldIndex = useRef(0);
  const newIndex = useRef(0);

  const updateHelperPosition = (event: MouseEvent) => {
    const offset = getPositionFromEvent(event);
    const translate = {
      x: offset.x - initOffset.current.x,
      y: offset.y - initOffset.current.y,
    };
    setTranslate3d(helper.current as HTMLElement, translate);
    return translate;
  };

  const handleMove = (event: MouseEvent) => {
    if (touched.current) {
      newIndex.current = oldIndex.current;
      const helperTranslate = updateHelperPosition(event);
      const draggableNodesArr = Object.values(draggableNodes);
      const { index: activeIndex, clientRect: activeClientRect } = activeNodeRef.current as DraggableNode;
      for (let i = 0; i < draggableNodesArr.length; i++) {
        const translate = {
          x: 0,
          y: 0,
        };
        const node = draggableNodesArr[i] as DraggableNode;
        if (node.id !== activeId && activeIndex !== i) {
          setTransitionDuration(node.node.current as HTMLElement, transitionDuration);
          // 动画计算
          if (!node.clientRect) {
            node.clientRect = node.node.current?.getBoundingClientRect();
          }
          // 加一层缓存防止移动但未松开时，clientRect会随着translate而变
          const nextNode = i + 1 < length && draggableNodesArr[i + 1];
          if (nextNode) {
            nextNode.clientRect = nextNode.node.current?.getBoundingClientRect();
          }
          // 拖拽下移
          // 这里高度除以2是为了优化移动触发条件
          if (
            i > activeIndex &&
            activeClientRect!.top + helperTranslate.y + activeClientRect!.height / 2 > node.clientRect!.top
          ) {
            translate.y = -(
              node.clientRect!.height + Math.max(activeNodeMargin.current.top, activeNodeMargin.current.bottom)
            );
            newIndex.current = i;
          } else if (
            i < activeIndex &&
            activeClientRect!.top + helperTranslate.y < node.clientRect!.top + node.clientRect!.height / 2
          ) {
            translate.y =
              node.clientRect!.height + Math.max(activeNodeMargin.current.top, activeNodeMargin.current.bottom);
            // 当上移时，由于i是从小到大遍历，为了要取到最小的那个i
            if (newIndex.current === oldIndex.current) {
              newIndex.current = i;
            }
          }
        }
        setTranslate3d(node.node.current as DragNode, translate);
      }
    }
  };
  const handleEnd = (event) => {
    if (touched.current) {
      touched.current = false;
      helper.current?.parentNode?.removeChild(helper.current);
      setActiveId && setActiveId('');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      const draggableNodesArr = Object.values(draggableNodes);
      for (let i = 0; i < draggableNodesArr.length; i++) {
        const node = draggableNodesArr[i] as DraggableNode;
        node.clientRect = undefined;
        setTransitionDuration(node.node.current as HTMLElement);
        setTranslate3d(node.node.current as DragNode);
      }
      onDragEnd && onDragEnd(oldIndex.current, newIndex.current);
    }
  };
  const handleStart = (event: any) => {
    const node = closest(event.target, (n) => n.dragitemid);
    if (node) {
      const activeId = node.dragitemid!;
      const activeNodeDescriptor = draggableNodes[activeId];
      const activeNode = activeNodeDescriptor?.node.current;
      if (activeNode) {
        setActiveId && setActiveId(activeId);
        activeNodeRef.current = activeNodeDescriptor;
        newIndex.current = oldIndex.current = activeNodeDescriptor.index;
        activeNodeDescriptor.clientRect = activeNode.getBoundingClientRect();
        const { x, y, height, width } = activeNodeDescriptor.clientRect;
        activeNodeMargin.current = getElementMargin(activeNode);
        const { left, top } = activeNodeMargin.current;
        // 这里克隆的时候会将本身的margin属性也附上，因此top多计算了一次margin，因此要减掉
        helper.current = activeNode?.cloneNode(true) as HTMLElement;
        if (helper.current) {
          document.body.appendChild(helper.current);
          setInlineStyles(helper.current, {
            boxSizing: 'border-box',
            height: `${height}px`,
            left: `${x - left}px`,
            pointerEvents: 'none',
            position: 'fixed',
            top: `${y - top}px`,
            width: `${width}px`,
          });
        }
        initOffset.current = getPositionFromEvent(event);
        touched.current = true;
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
      }
    }
  };

  useEffect(() => {
    if (dragListRef.current) {
      const container = dragListRef.current;
      // Object.keys(EVENTS)
      container.addEventListener('mousedown', handleStart);
    }
  }, []);

  return (
    <div ref={dragListRef} className={classnames(`${prefix}-draggable-list`, className)} style={style}>
      {children}
    </div>
  );
}
DraggableList.Item = DraggableItem;

export default function SortableList(props: DraggableListProps) {
  return (
    <SortableContext>
      <DraggableList {...props} />
    </SortableContext>
  );
}
