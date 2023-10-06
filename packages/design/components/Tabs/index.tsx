import React from 'react';
import { TabsProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import { useControlled } from '../hooks';

function getActiveItem(
  items: TabsProps['items'],
  value: TabsProps['items'][number]['key']
) {
  const activeItems = items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.key === value);
  return activeItems?.[0];
}
const Tabs: React.FC<TabsProps> = (props) => {
  const [value, onChange] = useControlled<TabsProps['items'][number]['key']>(
    props,
    {
      defaultValue: props.items[0]?.key ?? 0,
    }
  );

  const { className, style, items = [] } = props;
  const activeItem = getActiveItem(items, value);
  return (
    <div className={classnames(`${prefix}_tabs`, className)} style={style}>
      <div className={`${prefix}_tabs_bar`}>
        {items.map((item) => {
          return (
            <div
              className={classnames(`${prefix}_tabs_bar_item`, {
                [`${prefix}_tabs_bar_item__active`]: value === item.key,
              })}
              key={item.key}
              onClick={() => onChange(item.key)}
            >
              {item.label}
            </div>
          );
        })}
        <div className={`${prefix}_tabs_bar_scrollrail`}>
          <div className={`${prefix}_tabs_bar_scrollbar`} />
        </div>
      </div>
      <div className={`${prefix}_tabs_content`}>{activeItem?.children}</div>
    </div>
  );
};
export default Tabs;
