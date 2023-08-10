import ReactDom from 'react-dom/client';
import React, { useEffect } from 'react';
import { HashRouter, useLocation, useRoutes } from 'react-router-dom';
import router from '@/routers';
import './index.scss';
import { useLayoutEffect } from 'react';

const App = () => {
  return useRoutes(router);
};

function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash && hash.length) {
      const element = document.querySelector(`${hash}`);
      if (element) {
        console.log(element.getBoundingClientRect());
        window.scrollTo({ top: element.getBoundingClientRect().top - 70, behavior: 'smooth' });
      }
    }
  }, [hash]);
}

function useAutoScrollToTop() {
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
}

const GlobalWrap: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  useAutoScrollToTop();
  useScrollToHash();
  return children;
};

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <GlobalWrap>
      <App />
    </GlobalWrap>
  </HashRouter>
);
