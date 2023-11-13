import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';

export function DefaultLayout() {
  const location = useLocation();
  const currentRoute = location.pathname;

  const containerClass = useMemo((): string => {
    switch (currentRoute) {
      case AppRoute.Root:
        return 'page--gray page--main';
      default:
        return '';
    }
  }, [currentRoute]);
  return (
    <div className={`page ${containerClass}`}>
      <Header />
      <Outlet />
    </div>
  );
}
