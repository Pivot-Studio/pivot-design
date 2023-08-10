import React, { useState } from 'react';
import './index.scss';
import Logo from '../../images/logo';
import { Link, Outlet } from 'react-router-dom';

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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => {
    if (theme === 'dark') {
      document.body.setAttribute('pivot-theme', 'light');
      setTheme('light');
    } else {
      document.body.setAttribute('pivot-theme', 'dark');
      setTheme('dark');
    }
  };
  return (
    <div className="pivot-design-home">
      <div className="pivot-design-home-title">
        <div className="title">Pivot Design</div>
        <div className="navigation-wrapper">
          <div onClick={toggleTheme}>切换主题</div>
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
