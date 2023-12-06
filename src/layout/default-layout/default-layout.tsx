import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { getFavoriteOffers } from '../../store/slices';

export function DefaultLayout() {
  const { cityName } = useParams();
  const location = useLocation();
  const currentRoute = location.pathname;
  const { data: favoriteOffers } = useAppSelector(getFavoriteOffers);
  const favoritesCount = favoriteOffers?.length;

  const containerClass = useMemo((): string => {
    if (currentRoute === AppRoute.Root) {
      return 'page--gray page--main';
    } else if (currentRoute === `/${cityName}`) {
      return 'page--gray page--main';
    } else if (currentRoute === AppRoute.Favorites && !favoritesCount) {
      return 'page__main--favorites-empty page--favorites-empty';
    } else {
      return '';
    }
  }, [cityName, currentRoute, favoritesCount]);
  return (
    <div className={`page ${containerClass}`}>
      <Header />
      <Outlet />
    </div>
  );
}
