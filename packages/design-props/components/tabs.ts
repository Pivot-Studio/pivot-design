import { CSSProperties, ReactNode } from 'react';
import { PivotDesignProps } from './';

type UniqueId = string | number;

interface TabsItemProps {
  label: UniqueId;
  key: UniqueId;
  children?: ReactNode;
}
export interface TabsProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 自定义Tabs内容容器样式
   */
  contentStyle?: CSSProperties;
  /**
   * @version 1.0.0
   * @description 自定义渲染Tabs公共内容
   */
  renderCommonContent?: (item: TabsItemProps) => ReactNode;
  /**
   * @version 1.0.0
   * @description 标签页项最主要的数据，用于渲染标签页
   * @default []
   */
  items: TabsItemProps[];
  /**
   * @version 1.0.0
   * @description 标签种类样式
   * @default "default"
   */
  type?: 'default' | 'card';
  /**
   * @version 1.0.0
   * @description 当前激活的标签页索引
   * @default 0
   */
  value?: UniqueId;
  /**
   * @version 1.0.0
   * @description 标签页发生改变时触发的监听函数
   * @default undefined
   */
  onChange?: (tab: UniqueId) => void;
}
