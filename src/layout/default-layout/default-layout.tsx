import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';

export function DefaultLayout() {
  const { cityName } = useParams();
  const location = useLocation();
  const currentRoute = location.pathname;

  const containerClass = useMemo((): string => {
    switch (currentRoute) {
      case AppRoute.Root:
        return 'page--gray page--main';
      case `/${cityName}`:
        return 'page--gray page--main';
      default:
        return '';
    }
  }, [cityName, currentRoute]);
  return (
    <div className={`page ${containerClass}`}>
      <Header />
      <Outlet />
    </div>
  );
}
