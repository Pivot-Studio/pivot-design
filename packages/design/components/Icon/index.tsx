import React from 'react';
import { prefix } from '../constants';
import classnames from 'classnames';
import { ReactSVG } from 'react-svg';
import './index.scss';
import './icons';

import * as Icons from './icons';
import { getOssIcon } from './service';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

const Icon: React.FC<any> = (props) => {
  const { className, theme = 'primary', icon: iconName = 'loading', style, size = '16', ossIcon } = props;

  const classes = classnames(`${prefix}-icon`, className, `${prefix}-icon-size-${size}`, {
    [`${prefix}-icon-${theme}`]: theme,
  });

  const iconToSvgName = (name: string) => {
    return (Icons as any)[name];
  };

  // const iconToElement = (name: string) => {
  //   return React.createElement(Icons && (Icons as any)[name], {});
  // };

  return (
    <>
      <ReactSVG
        src={ossIcon ? getOssIcon(ossIcon) : iconToSvgName(`${iconName}Icon`)}
        className={classes}
        style={style}
      />
    </>
  );
};
export default Icon;
