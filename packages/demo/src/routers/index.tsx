import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import Homehome from '../pages/home/home';
import Component from '../pages/component';
import { Button, Icon, Input, Skeleton, Card, Popover } from 'pivot-design';
import ButtonMdx from '@/components/Button/index.mdx';
import IconMdx from '@/components/Icon/index.mdx';
import InputMdx from '@/components/Input/index.mdx';
import CardMdx from '@/components/Card/index.mdx';
import PopoverMdx from '@/components/Popover/index.mdx';
import SkeletonMdx from '@/components/Skeleton/index.mdx';

import CodeBlock from '@/components/_CodeBlock/codeBlock';
import Draggable from '@/examples/Draggable/Draggable';

export type ExtraRoute = RouteObject & {
  name?: string;
  children?: ExtraRoute[];
  path: string;
};

const router: ExtraRoute[] = [
  {
    path: '/',
    element: <Home />,
    name: '',
    children: [
      {
        path: '',
        element: <Homehome />,
      },
      {
        path: 'components',
        element: <Component />,
        children: [
          {
            path: 'button',
            element: <ButtonMdx components={{ Button, CodeBlock }} />,
            name: '按钮',
          },
          {
            path: 'card',
            element: <CardMdx components={{ Card, CodeBlock }} />,
            name: '卡片',
          },
          {
            path: 'draggable',
            element: <Draggable />,
            name: '拖拽列表',
          },
          {
            path: 'skeleton',
            element: <SkeletonMdx components={{ Skeleton, CodeBlock }} />,
            name: '骨架屏',
          },
          {
            path: 'icon',
            element: <IconMdx components={{ Icon, CodeBlock }} />,
            name: '图标',
          },
          {
            path: 'input',
            element: <InputMdx components={{ Input, CodeBlock }} />,
            name: '输入框',
          },
          {
            path: 'popover',
            element: <PopoverMdx components={{ Popover, CodeBlock }} />,
            name: '气泡',
          },
        ],
      },
    ],
  },
];
export default router;
