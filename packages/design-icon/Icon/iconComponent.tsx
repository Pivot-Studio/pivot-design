import React from 'react';
import { prefix } from '../constants';
import classnames from 'classnames';
import { IconProps } from 'pivot-design-props';
import './index.scss';
import './icons-svg';

import * as Icons from './icons-svg';

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme = 'primary', icon: iconName, style, color, size = '16', rotate = false } = props;
  const classes = classnames(`${prefix}-icon`, className, {
    [`${prefix}-icon-${theme}`]: theme,
    [`${prefix}-icon-rotate`]: rotate,
  });
  console.log(Icons, iconName, 'name');

  return (
    <>
      <div className={classes} style={style}>
        {React.createElement((Icons && (Icons as any)[iconName as string]) || Icons['DefautError'], {
          color: color,
          size: size,
        })}
      </div>
    </>
  );
};
export default Icon;
