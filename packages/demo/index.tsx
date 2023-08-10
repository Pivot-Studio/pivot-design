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
    const decodeHash = decodeURIComponent(hash);
    if (hash && hash.length) {
      const element = document.querySelector(`${decodeHash}`);
      if (element) {
        window.scrollTo({ top: element.getBoundingClientRect().top - 70, behavior: 'smooth' });
      }
    }
  }, [hash]);
}

function useAutoScrollToTop() {
  const { hash } = useLocation();
  useLayoutEffect(() => {
    if (hash && hash.length) {
      return;
    }
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
