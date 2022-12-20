import React, { useEffect, useRef, useState } from 'react';
import { CardProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
// function getAction(actions: React.ReactNode[]) {
//   const actionList = actions.map((action, index) => (
//     <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
//       <span>{action}</span>
//     </li>
//   ));
//   return actionList;
// }
let num: number = 0;
const Card: React.FC<CardProps> = (props) => {
  const {
    className,
    style,
    size = 'middle',
    loading = false,
    title,
    actions,
    bordered = true,
    time,
    extra,
    children,
    cover,
    boradius = true,
  } = props;
  // const triggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   onClick && onClick(e);
  // };
  // const loadingBlock=(<div></div>)
  const descRef = useRef<any>();
  const [needExpandBtn, setNeedExpandBtn] = useState<boolean>(false);
  useEffect(() => {
    /** 组件加载完成，ref加载完成，初始状态判断。 */
    setNeedExpandBtn(
      descRef?.current?.scrollHeight > descRef?.current?.clientHeight
    );
  }, []);

  if (loading) {
    return <Card className={`${prefix}-card-loading`}></Card>;
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
  const head = (title?: string, extra?: React.ReactNode, time?: string) => {
    if (title || extra || time) {
      return (
        <div className={`${prefix}-head`}>
          <div className={`${prefix}-head-wrapper`}>
            {title && <div className={`${prefix}-head-title`}>{title}</div>}
            {extra && <div className={`${prefix}-head-extra`}>{extra}</div>}
            {time && <div className={`${prefix}-head-time`}>{time}</div>}
          </div>
        </div>
      );
    } else return <div></div>;
  };

  const body = (children: React.ReactNode) => {
    num++;
    //console.log(children, 'children');
    // if(children.length){
    // }
    const btn = (children: React.ReactNode) => {
      return (
        <div className={`${prefix}-card-body-content`}>
          <input
            id={`${prefix}-card-body-btn-exp-${num}`}
            className={`${prefix}-card-body-exp`}
            type="checkbox"
          />

          <div className={`${prefix}-card-body-text`} ref={descRef}>
            {children}
          </div>
          {needExpandBtn && (
            <label
              className={`${prefix}-card-body-btn`}
              htmlFor={`${prefix}-card-body-btn-exp-${num}`}
            ></label>
          )}
        </div>
      );
    };
    // const text = (children: React.ReactNode) => {
    //   return <div className={`${prefix}-card-body-text`}>{children}</div>;
    // };
    return (
      <div className={classnames(`${prefix}-card-body`)}>{btn(children)}</div>
    );
  };
  const actionDom = (actions: React.ReactNode) => {
    return <div className={`${prefix}-actions`}>{actions}</div>;
  };

  return (
    <div className={classNames} style={style}>
      {cover}
      {head(title, extra, time)}
      {body(children)}
      {actionDom(actions)}
    </div>
  );
};

export default Card;
