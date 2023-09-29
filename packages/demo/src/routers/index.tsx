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
import Editor from '@/pages/components/editor';
import { generateComponentRouter } from '@/utils';

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
        children: generateComponentRouter({
          button: <Button />,
          switch: <Switch />,
          icon: <Icon />,
          input: <Input />,
          card: <Card />,
          popover: <Popover />,
          draggable: <Draggable />,
          transition: <Transition />,
          skeleton: <Skeleton />,
          modal: <Modal />,
          editor: <Editor />,
        }),
      },
    ],
  },
];
export default router;
