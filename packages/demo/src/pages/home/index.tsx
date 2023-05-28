import React from 'react';
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
  {
    text: '博客',
    path: '/blogs',
  },
];

const Home: React.FC = () => {
  return (
    <div className="pivot-design-home">
      <div className="pivot-design-home-title">
        <div className="title">
          <Logo />
        </div>
        <div className="navigation-wrapper">
          {navigatorList.map((nav) => (
            <Link to={nav.path} className="navigator">
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
