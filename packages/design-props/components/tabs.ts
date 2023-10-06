import { ReactNode } from 'react';
import { PivotDesignProps } from './';

type UniqueId = string | number;

interface TabsItemProps {
  label: UniqueId;
  key: UniqueId;
  children: ReactNode;
}
export interface TabsProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 标签页项最主要的数据，用于渲染标签页
   * @default []
   */
  items: TabsItemProps[];
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
