import React, { useState } from 'react';
import './index.scss';
import Logo from '../../images/logo';
import { Link, Outlet } from 'react-router-dom';
import { Switch } from 'pivot-design';
import { IconGithub } from 'pivot-design-icon';

const navigatorList = [
  {
    text: '组件',
    path: '/components/button',
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
        <Link to={'/'} className="title">
          Pivot Design
        </Link>
        <div className="navigation-wrapper">
          {navigatorList.map((nav) => (
            <Link to={nav.path} className="navigator" key={nav.path}>
              {nav.text}
            </Link>
          ))}
          <Switch value={isLight} onChange={onThemeChange} />
          <a href="https://github.com/Pivot-Studio/pivot-design" style={{ lineHeight: 0 }}>
            <IconGithub color="var(--semi-color-text-0)" width={18} height={18} />
          </a>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Home;
