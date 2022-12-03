import React, { useRef, useState } from 'react';
import { DraggableListProps } from 'pivot-design-props';
import { prefix } from '../constants';
import { DndContext, initDraggableContext } from './utils/context';
import classnames from 'classnames';
import DraggableItem from './DraggableItem';
import './DraggableList.scss';
function DraggableList(props: DraggableListProps) {
  const {
    className,
    style,
    children: childrenWithNewline,
    onDragEnter,
  } = props;
  const children = childrenWithNewline?.filter((v) => typeof v !== 'string');
  const [ctx, setCtx] = useState(initDraggableContext);
  const draggingRef = useRef<HTMLDivElement>();
  const dragListRef = useRef<HTMLDivElement>(null);
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setCtx({ activeId: index });
    const target = e.target as HTMLDivElement;
    draggingRef.current = target;
    e.dataTransfer.effectAllowed = 'move';
  };
  const dragEndHandler = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setCtx({ activeId: null });
  };
  //TODO:不改变dom结构，使用transform动画来实现效果
  //在ctx记录每一个DraggableItem的坐标
  const dragEnterHandler = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (onDragEnter) {
      onDragEnter(e, index);
      return;
    }
    const target = e.target as HTMLDivElement;
    if (target === draggingRef.current || target == dragListRef.current) return;
    const childrenArr = Array.from(
      dragListRef.current!.querySelectorAll(`.${prefix}-draggable-item`)
    );
    const draggingIndex = childrenArr.indexOf(draggingRef.current!);
    const dragEnterIndex = childrenArr.indexOf(target.parentNode as Element);
    
    if (draggingIndex > dragEnterIndex) {
      dragListRef.current?.insertBefore(
        draggingRef.current!,
        target.parentNode
      );
    } else if (draggingIndex < dragEnterIndex) {
      // 如果第二个参数是null的话，则插入到最后一个位置去
      dragListRef.current?.insertBefore(
        draggingRef.current!,
        target.parentNode!.nextSibling
      );
    }
  };
  return (
    <DndContext.Provider value={ctx}>
      <div
        ref={dragListRef}
        className={classnames(`${prefix}-draggable-list`, className)}
        style={style}
      >
        {children &&
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
          ))}
      </div>
    </DndContext.Provider>
  );
}
DraggableList.Item = DraggableItem;
export default DraggableList;
