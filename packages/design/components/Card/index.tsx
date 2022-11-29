import React from 'react';
import { CardProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
function getAction(actions: React.ReactNode[]) {
  const actionList = actions.map((action, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li style={{ width: `${100 / actions.length}%` }} key={`action-${index}`}>
      <span>{action}</span>
    </li>
  ));
  return actionList;
}
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
    children

  } = props;
  // const triggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   onClick && onClick(e);
  // };
  //const loadingBlock=(<div></div>)
  if (loading) {
    return (<Card className={`${prefix}-card-loading`}>

    </Card>);
  }
  let head: React.ReactNode;
  let classNames = classnames(`${prefix}-card`, className, `${prefix}-card-${size}`);
  if (bordered == true) {
    classNames = classnames(classNames, `${prefix}-card-border`);
  }
  if (title || extra || time) {
    head = (<div className={`${prefix}-head`}>
      <div className={`${prefix}-head-wrapper`}>
        {title && <div className={`${prefix}-head-title`}>{title}</div>}
        {extra && <div className={`${prefix}-head-extra`}>{extra}</div>}
        {time && <div className={`${prefix}}-head-time`}>{time}</div>}
      </div>
    </div>);
  }
  let body: React.ReactNode;
  body = (
    <div className={`${prefix}-card-body`}>
      {children}
    </div>);
  const actionDom = actions && actions.length ? (
    <ul className={`${prefix}-card-actions`}>{getAction(actions)}</ul>
  ) : null;
  return (
    <Card
      className={classNames}
      style={style}
    >
      {head}
      {body}
      {actionDom}
    </Card>
  );
};
export default Card;
