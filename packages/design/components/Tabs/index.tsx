import React, { CSSProperties, useEffect, useState } from 'react';
import { TabsItemProps, TabsProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import { useControlled } from '../hooks';

function getActiveItem(items: TabsItemProps[], value: TabsItemProps['key']) {
  const activeItems = items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => item.key === value);
  if (activeItems.length < 1) {
    throw new Error('当前激活Tab发生未知错误');
  }
  return activeItems[0] as TabsItemProps;
}

type TabSizeMap = Map<
  TabsItemProps['key'],
  { width: number; height: number; left: number; top: number }
>;

const Tabs: React.FC<TabsProps> = (props) => {
  const [value, onChange] = useControlled<TabsItemProps['key']>(props, {
    defaultValue: props.items[0]?.key ?? 0,
  });
  const [tabSizes, setTabSizes] = useState<TabSizeMap>(new Map());
  const {
    className,
    style,
    contentStyle,
    items = [],
    type = 'default',
    renderCommonContent,
  } = props;

  const activeItem = getActiveItem(items, value);

  // Update buttons records
  const updateTabSizes = () =>
    setTabSizes(() => {
      const newSizes: TabSizeMap = new Map();
      items.forEach(({ key }) => {
        const btnNode = document.querySelector<HTMLElement>(
          `[data-tab-key="${key}"]`
        );
        if (btnNode) {
          newSizes.set(key, {
            width: btnNode.offsetWidth,
            height: btnNode.offsetHeight,
            left: btnNode.offsetLeft,
            top: btnNode.offsetTop,
          });
        }
      });
      return newSizes;
    });

  useEffect(() => {
    updateTabSizes();
  }, [items.map((tab) => tab.key).join('_')]);

  const getScrollBarStyle = (): CSSProperties => {
    const activeSize = tabSizes.get(activeItem.key);
    if (activeSize) {
      return {
        left: activeSize?.left + activeSize?.width / 2,
        width: activeSize?.width,
        transform: 'translateX(-50%)',
      };
    }
    return {
      left: 0,
      width: 0,
    };
  };
  return (
    <div className={classnames(`${prefix}_tabs`, className)} style={style}>
      <div
        className={classnames(
          `${prefix}_tabs_bar`,
          `${prefix}_tabs_bar_${type}`
        )}
      >
        {items.map((item) => {
          return (
            <div
              className={classnames(`${prefix}_tabs_bar_item`, {
                [`${prefix}_tabs_bar_item__active`]: value === item.key,
              })}
              key={item.key}
              data-tab-key={item.key}
              onClick={() => onChange(item.key)}
            >
              {item.label}
            </div>
          );
        })}

        <div className={`${prefix}_tabs_bar_scrollrail`}>
          {type !== 'card' && (
            <div
              className={`${prefix}_tabs_bar_scrollbar`}
              style={getScrollBarStyle()}
            />
          )}
        </div>
      </div>
      <div className={`${prefix}_tabs_content`} style={contentStyle}>
        {renderCommonContent && renderCommonContent(activeItem)}
        {activeItem?.children}
      </div>
    </div>
  );
};
export default Tabs;
