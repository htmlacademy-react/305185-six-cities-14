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
import { Offer } from '../types/offers';
import { getOfferPreviews } from '../utils/offers';

type AppProps = {
  offers: Offer[];
};

export function App({ offers }: AppProps) {
  const offerPreviews = getOfferPreviews(offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage offers={offerPreviews} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute hasAccess>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
