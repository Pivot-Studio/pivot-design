import { Modal, Button } from 'pivot-design';
import React, { useState } from 'react';
import Actions from '../../Card/svg/index.tsx';
//import More from "./svg/tab.tsx"
import { DndContext, DraggableItem } from 'pivot-design';

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [open, useOpen] = useState(false);

  const onDragEnd = ({ delta }: { delta: { x: number, y: number }, event: Event }) => {
    setCoordinates(({ x, y }) => {
      return {
        x: x + delta.x,
        y: y + delta.y,
      };
    });
  };
  const onchange = () => {
    useOpen(true);
  };
  const ModalOK = () => {
    useOpen(false);
  };
  const ModalCancel = () => {
    useOpen(false);
  };
  return (
    <>
      <Modal
        title={<div>这是一个标题</div>}
        content="Hello world1111111"
        open={open}
        ModalOK={ModalOK}
        ModalCancel={ModalCancel}
        isDragge={true}
        ModalRender={(modal) => (
          <>
            <DndContext onDragEnd={onDragEnd}>
              <DraggableItem className="demo-draggable-item" left={coordinates.x} top={coordinates.y}>
                {modal}
              </DraggableItem>
            </DndContext>
          </>
        )}
      >
        <p>h1这是内容</p>
      </Modal>
      <Button onClick={onchange}>按钮</Button>
    </>
  );
};
export default App;

// const App: React.FC = () => {
//   const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
//   const onDragEnd = ({ delta }: { delta: { x: number, y: number }, event: Event }) => {
//     setCoordinates(({ x, y }) => {
//       return {
//         x: x + delta.x,
//         y: y + delta.y,
//       };
//     });
//   };
//   return (
//     <>
//       <DndContext onDragEnd={onDragEnd}>
//         <DraggableItem className="demo-draggable-item" left={coordinates.x} top={coordinates.y}>
//           <Card
//             title={<div>多余文本</div>}
//             time="19:20 2020-09-15"
//             extra={<a href="#">...</a>}
//             boradius={false}
//             style={{ width: '600px', '--card-background-color': 'rgb(233, 233, 15)' }}
//             actions={<Actions />}
//           >
//             <p> 我好想买Airpods但是没有钱，梁老师可不可以资助我</p>
//             <p>
//               我好想买Airpods但是没有钱，梁老师可不可以资助我一点钱钱呢啊？
//               不多不多的，球球了！我好想买Airpods但是没有钱， 梁老师可不可以 资助我一点钱钱呢啊？不多不多的，球球了！
//               我好想买Airpods但是没有钱，梁老师可
//             </p>
//           </Card>
//         </DraggableItem>
//       </DndContext>
//     </>
//   );
// };
// export default App;
