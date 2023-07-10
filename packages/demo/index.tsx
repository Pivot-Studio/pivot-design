import ReactDom from 'react-dom/client';
import React, { ReactNode } from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import router from '@/routers';
import './index.scss';
import { useLayoutEffect } from 'react';

const App = () => {
  return useRoutes(router);
};

const AutoScrollToTop: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <AutoScrollToTop>
      <App />
    </AutoScrollToTop>
  </Router>
);
