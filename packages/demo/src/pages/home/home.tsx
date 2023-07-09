import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap, { Back } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bats from '../../images/bat.min';
import Mountain from '../../images/mountains/mountain.min';
import Mountain1 from '../../images/mountains/mountain1.min';

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
        // markers: true,
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
        translateY: 60,
        ease: 'power1.in',
      })
      .to('.mountain0', {
        translateY: 160,
        ease: 'power1.in',
      })
      .to('.big-title', {
        scale: 0,
        opacity: 0,
        delay: 1,
      })
      .to('.pivot-design-description', {
        opacity: 1,
        scale: 1,
        delay: 2,
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
    <div className="background">
      <div className="layer left_birds" />
      <div className="layer right_birds" />
      <div className="layer bats">
        <Bats />
      </div>
      <div className="layer mountain0">
        <Mountain />
      </div>
      <div className="layer mountain1">
        <Mountain1 />
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
      <div className="pivot-design-description">
        <div className="pivot-design-description-header">当一个与众不同、具有丰富想象力的组件库！</div>
        <div className="pivot-design-description-content-wrapper" />
      </div>
      {/* box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px 2px; */}
    </div>
  );
};
export default Home;
