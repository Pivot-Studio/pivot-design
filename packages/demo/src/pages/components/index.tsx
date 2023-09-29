import { Outlet, NavLink } from 'react-router-dom';
import './index.scss';
import { ComponentPath } from '@/utils';

function Index() {
  const demoSelect = () => {
    return (
      <div className="demo-container">
        {ComponentPath.map((component) => (
          <NavLink className={({ isActive }) => `demo-item ${isActive ? 'active' : ''}`} to={component.path}>
            {component.title}
          </NavLink>
        ))}
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
