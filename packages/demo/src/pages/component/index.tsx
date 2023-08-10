import React, { useEffect, useState } from 'react';
// import router from '@/routers';
import './index.scss';
import router, { ExtraRoute } from '@/routers';
import { list as DraggableList } from '../../components/Draggable/.catalog';
import { list as ButtonList } from '../../components/Button/.catalog';
import { list as InputList } from '../../components/Input/.catalog';
import { list as PopoverList } from '../../components/Popover/.catalog';
import { list as SkeletonList } from '../../components/Skeleton/.catalog';
import { list as IconList } from '../../components/Icon/.catalog';
import { list as CardList } from '../../components/Card/.catalog';
import { list as TransitionList } from '../../components/Transition/.catalog';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';

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
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/components') {
      navigate('./button');
      setSelect('button');
    } else {
      const componentName = location.pathname.split('/').pop();
      if (componentName) {
        setSelect(componentName);
      }
    }
  }, []);

  function handleClickButton(component: string) {
    setSelect(component);
    navigate(`./${component.toLowerCase()}`);
  }

  const componentsList = getRouterConfig(router, 'components').children as ExtraRoute[];

  const renderCatalog = (list) => {
    return (
      <div className="catalog_content">
        {list.map((item) => {
          return (
            <>
              <div className="catalog_h2">{item.h2}</div>
              {item.h3.map((i) => {
                return <div className="catalog_h3">{i}</div>;
              })}
            </>
          );
        })}
      </div>
    );
  };

  const demoSelect = () => {
    return (
      <div className="demo-container">
        {componentsList.map((item) => (
          <div
            className={`demo-item ${select === item.path ? 'active' : ''}`}
            key={item.path}
            onClick={() => handleClickButton(item.path)}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  };

  const components = {};
  // 标题元素加个id便于做锚点
  [1, 2, 3, 4, 5, 6].forEach((item) => {
    const tag = `h${item}`;
    components[tag] = ({ children }: { children: string }) => {
      return React.createElement(tag, { id: children }, children);
    };
  });

  return (
    <div className="pivot-design-docs-content">
      {demoSelect()}
      <div className="demo-component" id="nice">
        <MDXProvider components={components}>
          <Outlet />
        </MDXProvider>
      </div>
      <div className="demo-component-catalogue">
        {select === 'draggable' && renderCatalog(DraggableList)}
        {select === 'button' && renderCatalog(ButtonList)}
        {select === 'card' && renderCatalog(CardList)}
        {select === 'skeleton' && renderCatalog(SkeletonList)}
        {select === 'popover' && renderCatalog(PopoverList)}
        {select === 'input' && renderCatalog(InputList)}
        {select === 'icon' && renderCatalog(IconList)}
        {select === 'transition' && renderCatalog(TransitionList)}
      </div>
    </div>
  );
}
export default Index;
