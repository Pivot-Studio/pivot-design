import { Button } from 'pivot-design';

function ButtonDemo() {
  return (
    <>
      <div className="title">普通样式</div>
      <Button>button</Button>
      <div className="title">自定义颜色</div>
      <Button
        style={{
          '--button-background-color': 'yellow',
        }}
      >
        button
      </Button>
    </>
  );
}
export default ButtonDemo;
