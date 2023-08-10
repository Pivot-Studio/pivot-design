import { useState } from 'react';
// import router from '@/routers';
import './index.scss';

import { Outlet, useNavigate } from 'react-router-dom';
import router, { ExtraRoute } from '@/routers';

function getRouterConfig(router: ExtraRoute[], targetPath: string) {
  let res: ExtraRoute = { path: '/' };
  router.some((item) => {
    if (item.path === targetPath) {
      res = item;
      return true;
    } else if (item.children) {
      const childrenRes = getRouterConfig(item.children, targetPath);
      if (childrenRes) {
        res = childrenRes;
        return true;
      }
      return false;
    } else return false;
  });
  return res;
}

function Index() {
  const [select, setSelect] = useState('Draggable');
  const navigate = useNavigate();

  function handleClickButton(component: string) {
    setSelect(component);
    navigate(`./${component.toLowerCase()}`);
  }

  const componentsList = getRouterConfig(router, 'components').children as ExtraRoute[];

  const demoSelect = () => {
    return (
      <div className="demo-container">
        {componentsList.map((item) => (
          <div
            className={`demo-item ${select === item.path ? 'active' : ''}`}
            onClick={() => handleClickButton(item.path)}
          >
            {item.name}
          </div>
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
      <div className="demo-component-catalogue" style={{ width: '200px' }}>
        1
      </div>
    </div>
  );
}
export default Index;
