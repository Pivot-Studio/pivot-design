import { SkeletonProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import React from 'react';

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { loading = true, className, style, active, avatar = false, row = 4, title = false, bulk = false } = props;
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
  const SkeletonContent = (bulk?: boolean) => {
    const rowList = [...Array(row)].map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index} className={`${prefix}-skeleton-loading`} />
    ));
    return (
      <div className={classnames(`${prefix}-skeleton-content `)}>
        {SkeletonTitle(title)}
        {!bulk && <ul>{rowList}</ul>}
      </div>
    );
  };
  return (
    <div style={{ display: loading ? 'block' : 'none' }}>
      <div
        className={classnames(
          { [`${prefix}-skeleton-active`]: active, [`${prefix}-skeleton-loading`]: bulk },
          `${prefix}-skeleton`,
          className
        )}
        style={style}
      >
        {SkeletonAvatar(avatar)}
        {SkeletonContent(bulk)}
      </div>
    </div>
  );
};
export default Skeleton;
