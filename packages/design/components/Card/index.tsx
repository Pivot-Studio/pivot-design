import React from 'react';
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
  } = props;
  // const triggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   onClick && onClick(e);
  // };
  // const loadingBlock=(<div></div>)

  if (loading) {
    return <Card className={`${prefix}-card-loading`}></Card>;
  }
  let head: React.ReactNode;
  let classNames = classnames(
    `${prefix}-card`,
    className,
    `${prefix}-card-${size}`,
    { [`${prefix}-card-border`]: bordered }
  );

  if (title || extra || time) {
    head = (
      <div className={`${prefix}-head`}>
        <div className={`${prefix}-head-wrapper`}>
          {title && <div className={`${prefix}-head-title`}>{title}</div>}
          {extra && <div className={`${prefix}-head-extra`}>{extra}</div>}
          {time && <div className={`${prefix}-head-time`}>{time}</div>}
        </div>
      </div>
    );
  }

  const body = (children: React.ReactNode) => {
    return <div className={`${prefix}-card-body`}>{children}</div>;
  };
  const actionDom = (actions: React.ReactNode) => {
    return <div className={`${prefix}-actions`}>{actions}</div>;
  };

  return (
    <div className={classNames} style={style}>
      {head}
      {body(children)}
      {actionDom(actions)}
    </div>
  );
};

export default Card;