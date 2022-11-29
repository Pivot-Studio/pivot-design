import React from 'react';
import { PivotDesignProps } from './';
export interface DraggableListProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
}

export interface DraggableItemProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description 列表子项默认插槽
   * @default undefined
   */
  children?: React.ReactNode;
}
