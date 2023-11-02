import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import OfferPage from '../pages/offer-page/offer-page';
import PrivateRoute from './private-route';
import LoginPage from '../pages/login-page/login-page';
import { AppRoute } from '../const';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import { Offer } from '../types/offers';
import { getOfferPreviews } from '../utils/offers';

type AppProps = {
  offers: Offer[];
}

function App({ offers }: AppProps) {
  const offerPreviews = getOfferPreviews(offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage offers={offerPreviews} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute hasAccess>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
