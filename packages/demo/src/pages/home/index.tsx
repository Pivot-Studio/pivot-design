import React, { useEffect, useLayoutEffect, useState } from 'react';
import './index.scss';
import gsap, { Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '../../images/logo';
import Bats from '../../images/bat.min';
import Mountain from '../../images/mountain.min';
import Mountain1 from '../../images/mountains/mountain1.min';

// import BigLogo from '../../images/big-logo';
// import Introduction1 from '../../images/introduction1.tsx';
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

function darken(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}
gsap.registerPlugin(ScrollTrigger);
const Home: React.FC = () => {
  const [titleAppeared, setTitleAppeared] = useState(false);
  useLayoutEffect(() => {
    for (let index = 0; index < 12; index++) {
      gsap.from(`#title_letter_${index}`, {
        y: -100,
        delay: index * 0.02,
        ease: Back.easeOut.config(2),
        color: '#fff',
        onComplete: () => {
          if (index === 11) setTitleAppeared(true);
        },
      });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.layer',
        start: 'top top',
        end: '+=500',
        scrub: 1,
        markers: true,
        id: 'right_birds',
      },
    });
    gsap.fromTo(
      'svg #bats',
      {
        opacity: 0,
        scale: 0.3,
        y: 400,
      },
      {
        transformOrigin: '50%',
        y: -240,
        scale: 0.6,
        scrollTrigger: {
          trigger: '.layer',
          start: 'top top', // +=20 就是向上
          scrub: 1,
          // markers: true,
          id: 'bats',
          onEnter: () => {
            console.log('bats enter');
            gsap.utils.toArray('svg #bats').forEach((item) => {
              gsap.set(item, {
                opacity: 1,
              });
              gsap.to(item, {
                yoyo: true,
                repeat: 10,
                scaleX: 0.5,
                transformOrigin: '50%',
              });
            });
          },
          onLeave: () => {
            console.log('bats leave');
            gsap.utils.toArray('svg #bats').forEach((item) => {
              gsap.to(item, {
                opacity: 0,
              });
            });
          },
        },
      }
    );

    timeline
      .to('.right_birds', {
        translateY: -400,
        translateX: 200,
        opacity: 1,
        backgroundSize: 800,
        ease: 'power1.out',
      })
      .to('.right_birds', {
        opacity: 0,
      })
      .to('.mountain1', {
        translateY: 40,
        ease: 'power1.in',
      })
      .to('.mountain0', {
        translateY: 60,
        ease: 'power1.in',
      });
    gsap.to('.left_birds', {
      translateY: -600,
      translateX: -400,
      backgroundSize: 1200,
      opacity: 1,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.layer',
        start: 'top top',
        scrub: 1,
      },
    });
  }, []);
  useEffect(() => {
    if (titleAppeared) {
      setInterval(() => {
        const h = gsap.utils.random(0, 360);
        const s = gsap.utils.random(50, 100);
        for (let index = 0; index < 12; index++) {
          gsap.to(`#title_letter_${index}`, {
            delay: index * 0.02,
            duration: 1,
            color: darken(h, s, 80 - index * 4),
          });
        }
      }, 2000);
    }
  }, [titleAppeared]);
  return (
    <div className="pivot-design-home">
      <div className="background">
        <div className="layer left_birds" />
        <div className="layer right_birds" />
        <div className="layer bats">
          <Bats />
        </div>
        <div className="layer mountain0">
          <Mountain width="100%" />
        </div>
        <div className="layer mountain1">
          <Mountain1 width="100%" />
        </div>
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
      </div>
      {/* <div className="home-item">
        <div className="home-item-feature">
          <Introduction1 />
          <div>组件丰富，选用自如</div>
        </div>
      </div> */}
    </div>
  );
};
export default Home;
