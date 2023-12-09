import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  FavoritesPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  OfferPage,
} from '../pages/';
import { PrivateRoute } from './private-route';
import { AppRoute } from '../const';
import { DefaultLayout, LoginLayout } from '../layout/';
import { useAppDispatch } from '../hooks/store';
import { checkAuth } from '../store/api-actions';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={AppRoute.Root} element={<MainPage />}>
            <Route path="/:cityName" element={<MainPage />} />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
          <Route path={`${AppRoute.NotFound}`} element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path={AppRoute.Login} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
