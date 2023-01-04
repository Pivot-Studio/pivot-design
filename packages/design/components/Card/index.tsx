import React, { useEffect, useRef, useState } from 'react';
import { CardProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
//import {Avatar}  from './svg/avatar.tsx';
let num: number = 0;
const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    style,
    size = 'normal',
    loading = false,
    title,
    actions,
    bordered = true,
    time,
    extra,
    children,
    cover,
    avatar,
    boradius = true,
    Grid = false,
  } = props;

  const descRef = useRef<HTMLDivElement | null>(null);
  const [needExpandBtn, setNeedExpandBtn] = useState<boolean>(false);
  useEffect(() => {
    /** 组件加载完成，ref加载完成，初始状态判断。 */
    if (descRef?.current?.scrollHeight != undefined)
      setNeedExpandBtn(descRef?.current?.scrollHeight > descRef?.current?.clientHeight);
  }, []);

  if (loading) {
    return <div className={`${prefix}-card-loading`}></div>;
  }

  let classNames = classnames(
    `${prefix}-card`,
    className,
    `${prefix}-card-${size}`,
    { [`${prefix}-card-border`]: bordered },
    {
      [`${prefix}-card-borderadius`]: boradius,
    }
  );
  const CardHeader = (title?: React.ReactNode, extra?: React.ReactNode, time?: string, avatar?: React.ReactNode) => {
    if (title || extra || time || avatar) {
      return (
        <div className={`${prefix}-head`}>
          <div className={`${prefix}-head-wrapper`}>
            {avatar && <div className={`${prefix}-head-avatar`}>{avatar}</div>}
            {title && (
              <div className={`${prefix}-head-title`}>
                {title}
                {time && <div className={`${prefix}-head-time`}>{time}</div>}
              </div>
            )}
            {extra && <div className={`${prefix}-head-extra`}>{extra}</div>}
          </div>
        </div>
      );
    }
  };

  const CardBody = (children: React.ReactNode) => {
    num++;

    const btn = (children: React.ReactNode) => {
      return (
        <div className={`${prefix}-card-body-content`}>
          {/* 控制input的id与htmlFor相同 */}
          <input id={`${prefix}-card-body-btn-exp-${num}`} className={`${prefix}-card-body-exp`} type="checkbox" />

          <div className={Grid ? `${prefix}-card-body-grid` : `${prefix}-card-body-text`} ref={descRef}>
            {children}
          </div>
          {needExpandBtn && (
            <label className={`${prefix}-card-body-btn`} htmlFor={`${prefix}-card-body-btn-exp-${num}`}></label>
          )}
        </div>
      );
    };

    return <div className={classnames(`${prefix}-card-body`)}>{btn(children)}</div>;
  };

  const CardActionDom = (actions: React.ReactNode) => {
    return <div className={`${prefix}-card-actions`}>{actions}</div>;
  };

  return (
    <div className={classNames} style={style}>
      {cover}
      {CardHeader(title, extra, time, avatar)}
      {CardBody(children)}
      {CardActionDom(actions)}
    </div>
  );
};

export default Card;
