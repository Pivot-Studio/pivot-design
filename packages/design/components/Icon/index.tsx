import React from 'react';
import { prefix } from '../constants';
import classnames from 'classnames';
import { IconProps } from 'pivot-design-props';
import { ReactSVG } from 'react-svg';
import './index.scss';

import { getOssIcon } from './service';

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme = 'primary', style, ossIcon, url, rotate = false } = props;
  const classes = classnames(`${prefix}-icon`, className, {
    [`${prefix}-icon-${theme}`]: theme,
    [`${prefix}-icon-rotate`]: rotate,
  });

  return (
    (url || ossIcon) ?? <ReactSVG src={url ? url : getOssIcon(ossIcon as string)} className={classes} style={style} />
  );
};
export default Icon;
