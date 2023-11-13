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
import { Offer, OfferPreview } from '../types/offers';

type AppProps = {
  offers: Offer[];
  offerPreviews: OfferPreview[];
};

export function App({ offers, offerPreviews }: AppProps) {

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
              <FavoritesPage offers={offerPreviews} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} offerPreviews={offerPreviews} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
