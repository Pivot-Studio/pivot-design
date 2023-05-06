import { SkeletonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import React from 'react';

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { loading = true, className, style, avatar = false, row = 4, title = false, brick = false } = props;
  const SkeletonAvatar = (avatar?: boolean) => {
    return (
      <div>{avatar && <div className={classnames(`${prefix}-skeleton-avatar`, `${prefix}-skeleton-loading`)} />}</div>
    );
  };
  const SkeletonTitle = (title?: boolean) => {
    return (
      <div className={classnames(`${prefix}-skeleton-head`)}>
        {title && <div className={classnames(`${prefix}-skeleton-title`, `${prefix}-skeleton-loading`)} />}
      </div>
    );
  };
  const SkeletonContent = (brick?: boolean) => {
    const rowList = [...Array(row)].map((_, index) => <li key={index} className={`${prefix}-skeleton-loading`} />);
    return (
      <div className={classnames(`${prefix}-skeleton-content `)}>
        {SkeletonTitle(title)}
        {!brick && <ul>{rowList}</ul>}
      </div>
    );
  };

  return (
    <>
      {loading && (
        <div
          className={classnames({ [`${prefix}-skeleton-loading`]: brick }, `${prefix}-skeleton`, className)}
          style={style}
        >
          {SkeletonAvatar(avatar)}
          {SkeletonContent(brick)}
        </div>
      )}
    </>
  );
};
export default Skeleton;
