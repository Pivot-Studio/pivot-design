import React from 'react';
import { prefix } from '../constants';
import classnames from 'classnames';
import { IconProps } from 'pivot-design-props';
import { ReactSVG } from 'react-svg';
import './index.scss';
import './icons';

import * as Icons from './icons';
import { getOssIcon } from './service';

const Icon: React.FC<IconProps> = (props) => {
  const {
    className,
    theme = 'primary',
    icon: iconName,
    style,
    color,
    size = '16',
    ossIcon,
    url,
    rotate = false,
  } = props;
  const classes = classnames(`${prefix}-icon`, className, {
    [`${prefix}-icon-${theme}`]: theme,
    [`${prefix}-icon-rotate`]: rotate,
  });

  return (
    <>
      {url || ossIcon ? (
        <ReactSVG src={url ? url : getOssIcon(ossIcon as string)} className={classes} style={style} />
      ) : (
        <div className={classes} style={style}>
          {React.createElement((Icons && (Icons as any)[iconName as string]) || Icons['DefautError'], {
            color: color,
            size: size,
          })}
        </div>
      )}
    </>
  );
};
export default Icon;
