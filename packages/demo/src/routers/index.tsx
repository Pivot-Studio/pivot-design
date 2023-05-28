import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';
import Homehome from '../pages/home/home';
import Component from '../pages/component';

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Homehome />,
      },
      {
        path: 'components',
        element: <Component />,
      },
    ],
  },
];
export default router;
