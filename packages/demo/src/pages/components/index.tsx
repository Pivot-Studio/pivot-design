import { Outlet, NavLink } from 'react-router-dom';
import './index.scss';

function Index() {
  const demoSelect = () => {
    return (
      <div className="demo-container">
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'button'}>
          Button 按钮
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'switch'}>
          Switch 开关
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'card'}>
          Card 卡片
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'draggable'}>
          Draggable 拖拽列表
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'skeleton'}>
          Skeleton 骨架屏
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'icon'}>
          Icon 图标
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'input'}>
          Input 输入框
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'popover'}>
          Popover 气泡
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'modal'}>
          弹窗
        </NavLink>
        <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={'transition'}>
          Transition 元素动画
        </NavLink>
      </div>
    );
  };

  return (
    <div className="pivot-design-docs-content">
      {demoSelect()}
      <div className="demo-component" id="nice">
        <Outlet />
      </div>
    </div>
  );
}
export default Index;
