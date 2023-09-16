import { RouteObject } from 'react-router-dom';
import BaseHome from '@/pages/home';
import Home from '@/pages/home/home';
import Components from '@/pages/components';
import Button from '@/pages/components/button';
import Switch from '@/pages/components/switch';
import Icon from '@/pages/components/icon';
import Input from '@/pages/components/input';
import Card from '@/pages/components/card';
import Popover from '@/pages/components/popover';
import Draggable from '@/pages/components/draggable';
import Transition from '@/pages/components/transition';
import Skeleton from '@/pages/components/skeleton';
import Modal from '@/pages/components/modal';

const router: RouteObject[] = [
  {
    path: '/',
    element: <BaseHome />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'components',
        element: <Components />,
        children: [
          {
            path: 'button',
            element: <Button />,
          },
          {
            path: 'switch',
            element: <Switch />,
          },
          {
            path: 'icon',
            element: <Icon />,
          },
          {
            path: 'input',
            element: <Input />,
          },
          {
            path: 'card',
            element: <Card />,
          },
          {
            path: 'popover',
            element: <Popover />,
          },
          {
            path: 'draggable',
            element: <Draggable />,
          },
          {
            path: 'transition',
            element: <Transition />,
          },
          {
            path: 'skeleton',
            element: <Skeleton />,
          },
          {
            path: 'modal',
            element: <Modal />,
          },
        ],
      },
    ],
  },
];
export default router;
