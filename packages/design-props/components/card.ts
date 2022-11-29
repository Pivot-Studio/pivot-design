import React from 'react';
import { PivotDesignProps } from './';
export interface CardProps extends PivotDesignProps {
  /**
   * @version 1.0.0
   * @description �Զ�����ʽ
   * @default undefined
   */
  style?: React.CSSProperties
  /**
   * @version 1.0.0
   * @description �Զ����С
   * @default undefined
   */
  size?: 'small' | 'middle' | 'large'
  /**
  * @version 1.0.0
  * @description ��Ƭ�����Ƿ����
  * @default middle
  */
  loading?: boolean
  /**
  * @version 1.0.0
  * @description ��Ƭ����
  * @default undefined
  */
  title?: string
  /**
  * @version 1.0.0
  * @description ��Ƭ�ײ��Ĳ�����
  * @default undefined
  */
  actions?: Array<React.ReactNode>
  /**
  * @version 1.0.0
  * @description �Ƿ��б߿�
  * @default true
  */
  bordered?: boolean
  /**
  * @version 1.0.0
  * @description ��Ƭ���ϽǱ�ǩ
  * @default undefined
  */
  extra?: React.ReactNode
  /**
   * @version 1.0.0
   * @description ʱ���ǩ
   * @default undefined
   */
  time?: string
  /**
  * @version 1.0.0
  * @description ����
  * @default undefined
  */
  children?: React.ReactNode

}