import React, { useLayoutEffect } from 'react';
import './index.scss';
import gsap, { Back } from 'gsap';
import Logo from '../../images/logo';
import BigLogo from '../../images/big-logo';
import Introduction1 from '../../images/introduction1.tsx';
import { Link } from 'react-router-dom';
import { spawn } from 'child_process';

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
  useLayoutEffect(() => {
    for (let index = 0; index < 12; index++) {
      gsap.from(`#title_letter_${index}`, {
        y: -100,
        delay: index * 0.02,
        ease: Back.easeOut.config(2),
        color: '#fff',
      });
    }
  }, []);
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
          {'Pivot'.split('').map((letter, index) => (
            <span id={`title_letter_${index}`} className={`title_letter_${index}`}>
              {letter}
            </span>
          ))}
          <span id="title_5">&nbsp;</span>
          {'Design'.split('').map((letter, index) => (
            <span id={`title_letter_${index + 6}`} className={`title_letter_${index + 6}`}>
              {letter}
            </span>
          ))}
        </div>
        <div className="home-description">Pivot Design 是由Pivot Studio互联网团队前端组进行开发及维护的一个轻量级组件库</div>
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
