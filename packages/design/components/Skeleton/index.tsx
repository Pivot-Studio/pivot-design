import { SkeletonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import React from 'react';

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { loading = true, className, style, active, avatar = false } = props;
  const SkeletonAvatar = (avatar?: boolean) => {
    return <div>{avatar && <div className={`${prefix}-skeleton-avatar`}></div>}</div>;
  };
  const SkeletonTitle = (loading?: boolean) => {
    return <div>{loading && <div className={`${prefix}-skeleton-title`}></div>}</div>;
  };
  const SkeletonContent = (loading?: boolean) => {
    return (
      <div>
        {loading && (
          <div className={`${prefix}-skeleton-content`}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={classnames({ [`${prefix}-skeleton-active`]: active }, `${prefix}-skeleton`, className)}
      style={style}
    >
      {SkeletonTitle(loading)}
      {SkeletonContent(loading)}
      {SkeletonAvatar(avatar)}
    </div>
  );
};
export default Skeleton;
