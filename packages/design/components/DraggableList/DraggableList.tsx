import React, { useRef } from 'react';
import { DraggableListProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import DraggableItem from './DraggableItem';
import './DraggableList.scss';
// TODO: index 优化：使用children.map()来渲染子列表
function DraggableList(props: DraggableListProps) {
  const { className, style, children } = props;
  const draggingRef = useRef<HTMLDivElement>();
  const dragListRef = useRef<HTMLDivElement>(null);
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    draggingRef.current = target;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      (target as any).classList.add('moving');
    });
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const { target } = e;
    (target as any).classList.remove('moving');
  };
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    <div
      ref={dragListRef}
      className={classnames(`${prefix}-draggable-list`, className)}
      style={style}
      onDragStart={(e) => dragStartHandler(e)}
      onDragEnter={(e) => dragEnterHandler(e)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e) => dragEndHandler(e)}
    >
      {children}
    </div>
  );
}
DraggableList.Item = DraggableItem;
export default DraggableList;
