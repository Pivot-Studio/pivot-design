import React, { useState } from 'react';
import './index.scss';
import Logo from '../../images/logo';
import { Link, Outlet } from 'react-router-dom';
import { Switch } from 'pivot-design';

const navigatorList = [
  {
    text: '首页',
    path: '/',
  },
  {
    text: '组件',
    path: '/components',
  },
  // {
  //   text: '博客',
  //   path: '/blogs',
  // },
];

const Home: React.FC = () => {
  const [isLight, setIsLight] = useState(false);
  const onThemeChange = (isLight: boolean) => {
    document.body.setAttribute('pivot-theme', isLight ? 'light' : 'dark');
    setIsLight(isLight);
  };
  return (
    <div className="pivot-design-home">
      <div className="pivot-design-home-title">
        <div className="title">Pivot Design</div>
        <div className="navigation-wrapper">
          <Switch value={isLight} onChange={onThemeChange} />
          {navigatorList.map((nav) => (
            <Link to={nav.path} className="navigator" key={nav.text}>
              {nav.text}
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Home;
