import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const {
    className,
    style,
    children: childrenWithNewline,
    transitionDuration = 300,
    onDragEnter,
  } = props;

  let a = 1;
  console.log(a);

  let { node: draggableNodes, setActiveId, activeId } = useContext(Context);
  const children = childrenWithNewline?.filter((v) => typeof v !== 'string');
  const dragListRef = useRef<HTMLDivElement>(null);
  const helper = useRef<HTMLElement>();
  const activeNodeRef = useRef<DraggableNode>();
  const activeNodeMargin = useRef({ left: 0, right: 0, top: 0, bottom: 0 });
  const initOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touched = useRef(false);

  const updateHelperPosition = (event: MouseEvent) => {
    const offset = getPositionFromEvent(event);
    const translate = {
      x: offset.x - initOffset.current.x,
      y: offset.y - initOffset.current.y,
    };
    // setTransitionDuration(helper.current as HTMLElement, transitionDuration);
    setTranslate3d(helper.current as HTMLElement, translate);
    return translate;
  };

  const handleMove = (event: MouseEvent) => {
    if (touched.current) {
      const helperTranslate = updateHelperPosition(event);
      const draggableNodesArr = Object.values(draggableNodes);
      const { index: activeIndex, clientRect: activeClientRect } =
        activeNodeRef.current as DraggableNode;
      for (let i = 0; i < draggableNodesArr.length; i++) {
        const translate = {
          x: 0,
          y: 0,
        };
        const node = draggableNodesArr[i] as DraggableNode;
        if (node.id !== activeId && activeIndex !== i) {
          setTransitionDuration(
            node.node.current as HTMLElement,
            transitionDuration
          );

          // 动画计算
          node.clientRect = node.node.current?.getBoundingClientRect();
          const nextNode = i + 1 < length && draggableNodesArr[i + 1];
          if (nextNode) {
            nextNode.clientRect =
              nextNode.node.current?.getBoundingClientRect();
          }
          // 拖拽下移
          if (
            i > activeIndex &&
            activeClientRect!.top +
              helperTranslate.y +
              activeClientRect!.height >
              node.clientRect!.top
          ) {
            translate.y = -(
              node.clientRect!.height +
              Math.max(
                activeNodeMargin.current.top,
                activeNodeMargin.current.bottom
              )
            );
          } else if (
            i < activeIndex &&
            activeClientRect!.top + helperTranslate.y <
              node.clientRect!.top + node.clientRect!.height
          ) {
            translate.y = translate.y =
              node.clientRect!.height +
              Math.max(
                activeNodeMargin.current.top,
                activeNodeMargin.current.bottom
              );
          }
        }
        setTranslate3d(node.node.current as DragNode, translate);
      }
    }
  };
  const handleEnd = (event) => {
    touched.current = false;
    helper.current?.parentNode?.removeChild(helper.current);
    setActiveId && setActiveId('');
    const draggableNodesArr = Object.values(draggableNodes);
    for (let i = 0; i < draggableNodesArr.length; i++) {
      const node = draggableNodesArr[i] as DraggableNode;
      setTransitionDuration(node.node.current as HTMLElement);
      setTranslate3d(node.node.current as DragNode);
    }
  };
  const handleStart = (event: any) => {
    console.log(a++);

    const node = closest(event.target, (n) => n.dragitemid);
    if (node) {
      const activeId = node.dragitemid!;
      const activeNodeDescriptor = draggableNodes[activeId];
      const activeNode = activeNodeDescriptor?.node.current;
      if (activeNode) {
        setActiveId && setActiveId(activeId);
        // To Deprecate
        activeNodeRef.current = activeNodeDescriptor;
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
  const draggingRef = useRef<HTMLDivElement>();

  // const dragStartHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   index: number
  // ) => {
  //   const target = e.target as HTMLDivElement;
  //   draggingRef.current = target;
  //   e.dataTransfer.effectAllowed = 'move';
  // };
  // const dragEndHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   index: number
  // ) => {};

  // const dragEnterHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   index: number
  // ) => {
  //   e.preventDefault();
  //   if (onDragEnter) {
  //     onDragEnter(e, index);
  //     return;
  //   }
  //   const target = e.target as HTMLDivElement;
  //   if (target === draggingRef.current || target == dragListRef.current) return;
  //   const childrenArr = Array.from(
  //     dragListRef.current!.querySelectorAll(`.${prefix}-draggable-item`)
  //   );
  //   const draggingIndex = childrenArr.indexOf(draggingRef.current!);
  //   const dragEnterIndex = childrenArr.indexOf(target.parentNode as Element);

  //   if (draggingIndex > dragEnterIndex) {
  //     dragListRef.current?.insertBefore(
  //       draggingRef.current!,
  //       target.parentNode
  //     );
  //   } else if (draggingIndex < dragEnterIndex) {
  //     // 如果第二个参数是null的话，则插入到最后一个位置去
  //     dragListRef.current?.insertBefore(
  //       draggingRef.current!,
  //       target.parentNode!.nextSibling
  //     );
  //   }
  // };
  return (
    <div
      ref={dragListRef}
      className={classnames(`${prefix}-draggable-list`, className)}
      style={style}
    >
      {children}
      {/* {children &&
          children.map((item, index) => (
            <DraggableItem
              key={index}
              id={index}
              onDragStart={(e) => dragStartHandler(e, index)}
              onDragEnter={(e) => dragEnterHandler(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={(e) => dragEndHandler(e, index)}
            >
              {item}
            </DraggableItem>
          ))} */}
    </div>
  );
}
DraggableList.Item = DraggableItem;

export default function SortableList(props: DraggableListProps) {
  return (
    <SortableContext>
      <DraggableList {...props}></DraggableList>
    </SortableContext>
  );
}
