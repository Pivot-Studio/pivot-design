import {  useState ,useRef,useEffect,useCallback} from 'react';

/*
 * @drag: 添加拖拽事件的元素（支持传入元素的drager，id，class等）必填参数
 * @draggerBox: 被拖拽的整体元素（支持传入元素的dragger，id，class等）可选参数
 * @container: 可拖拽的区域（支持传入元素的dragger，id，class等）可选参数
 * @maring: 离外部元素的间隔 可选参数
 */
export default function useDrag({
  open,
  container = document.body,
  maring = [0, 0, 0, 0],
  isDragge
}: any) {
  if(!isDragge){
    return;
  }
  const [translateX, setTranslateX] = useState(0); // 水平方向偏移量
  const [translateY, setTranslateY] = useState(0); // 垂直方向偏移量
  
  const dragNode=useRef<any>();
  //console.log(dragger, 'dragger');
  const setDragNodeRef = useCallback((currentNode: HTMLElement | null) => {
    dragNode.current = currentNode;
    setTranslateX(0);
    setTranslateY(0);
  }, [open]);
  useEffect(() => {
    if (!dragNode.current) return;
    if (!container) return;
    const  dragger = typeof dragNode === 'string' ? document.querySelector(dragNode) : dragNode.current; // 根据传入的值类型，去查找使用元素
    const draggerBox = typeof dragNode === 'string' ? document.querySelector(dragNode) :dragNode.current;
    container = typeof container === 'string' ? document.querySelector(container) : container;
    const {
      left: containerL,
      top: containerT,
      right: containerR,
      bottom: containerB,
    } = container.getBoundingClientRect(); // 获取可拖拽区域边界位置
    
    const onMouseDown = (event: any) => {
      const initMouseX = event.clientX; // 元素初始水平坐标值
      const initMouseY = event.clientY; // 元素初始垂直坐标
      console.log('mousedown');
      const { left: boxL, top: boxT, right: boxR, bottom: boxB } = draggerBox.getBoundingClientRect(); // 获取拖拽实体的位置

      let deltaMouseX: number; // 实际水平偏移量
      let deltaMouseY: number; // 实际垂直增量值

      const onMouseMove = (event: any) => {
        console.log('onMouseMove');
        const moveMouseX = event.clientX; // 元素移动后水平坐标值
        const moveMouseY = event.clientY; // 元素移动后垂直坐标值

        let deltaX = moveMouseX - initMouseX; // 当前移动水平相对移动距离
        let deltaY = moveMouseY - initMouseY; // 当前移动垂直相对移动距离
        //console.log(deltaX, deltaY)
        if (boxL + deltaX < containerL + maring[0]) {
          // 当元素左边框+水平相对移动距离 < 可拖拽区域左边界+左边距时 （说明元素已经超出左侧边界）

          deltaX = containerL + maring[0] - boxL;
        }

        if (boxR + deltaX > containerR - maring[1]) {
          // 当元素右边框+水平相对移动距离 > 可拖拽区域右边界+右边距时 （说明元素已经超出右侧边界）
          deltaX = containerR - maring[1] - boxR;
        }

        if (boxB + deltaY > containerB - maring[2]) {
          // 当元素下边框+垂直相对移动距离 > 可拖拽区域下边界+下边距时 （说明元素已经超出下侧边界）
          deltaY = containerB - maring[2] - boxB;
        }

        if (boxT + deltaY < containerT + maring[3]) {
          // 当元素上边框+垂直相对移动距离 < 可拖拽区域上边界+上边距时 （说明元素已经超出上侧边界）
          deltaY = containerT + maring[3] - boxT;
        }

        deltaMouseX = deltaX + translateX; // 实际水平偏移量
        deltaMouseY = deltaY + translateY; // 实际垂直偏移量
        
        draggerBox.style.transform = `translate(${deltaMouseX-(boxR-boxL)/2}px, ${deltaMouseY+(boxT-boxB)/2}px)`;
        //draggerBox.style.left = boxL+'px';
        //draggerBox.style.top=boxT+'px';
      };

      const onMouseUp = () => {
        console.log('onMouseUp');
        setTranslateX(deltaMouseX); // 保存上次水平偏移量
        setTranslateY(deltaMouseY); // 保存上次垂直偏移量
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };
    dragger.addEventListener('mousedown', onMouseDown);

    return () => dragger.removeEventListener('mouseup', onMouseDown);
  }, [dragNode, container, maring]);
  return setDragNodeRef;
}
