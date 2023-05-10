import { RouteObject } from 'react-router-dom';
import Home from '../pages/home';

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];
export default router;
