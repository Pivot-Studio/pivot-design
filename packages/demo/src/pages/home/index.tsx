import React from 'react';
import './index.scss';
import Logo from '../../images/logo';
import BigLogo from '../../images/big-logo';
import Introduction1 from '../../images/introduction1.tsx';
import { Link } from 'react-router-dom';

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
      <div className="background">
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
        <div className="big-title">
          <BigLogo />
        </div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <div className="home-item">
        <div className="home-item-feature">
          <Introduction1 />
          <div>组件丰富，选用自如</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
