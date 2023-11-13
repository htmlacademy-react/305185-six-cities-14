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
import { DefaultLayout, LoginLayout } from '../layout/';

type AppProps = {
  offers: Offer[];
  offerPreviews: OfferPreview[];
};

export function App({ offers, offerPreviews }: AppProps) {

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DefaultLayout />}>
          <Route
            path={AppRoute.Root}
            element={<MainPage offers={offerPreviews} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute hasAccess>
                <FavoritesPage offers={offerPreviews} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage offers={offers} offerPreviews={offerPreviews} />}
          />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path={AppRoute.Login} element={<LoginPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
