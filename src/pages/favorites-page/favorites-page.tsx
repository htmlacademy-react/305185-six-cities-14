import { useEffect } from 'react';

import { PlaceCard } from '../../components/place-card/place-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { OfferPreview } from '../../types/offers';
import { getFavoriteOffers, getUser } from '../../store/slices';
import { checkAuth, fetchFavoriteOffers, fetchOffers } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../../components/shared/spinner/spinner';

// normalizes offers by city key
const getOffersByCityKey = (favOffers: OfferPreview[]) => {
  const offersByCityKey: Record<string, OfferPreview[]> = {};

  favOffers.forEach((favorite) => {
    const { city } = favorite;
    offersByCityKey[city.name] = offersByCityKey[city.name] || [];
    offersByCityKey[city.name].push(favorite);
  });

  // and sorts them alphabetically
  const sortedKeys = Object.keys(offersByCityKey).sort();
  const sortedOffersByCityKey: Record<string, OfferPreview[]> = {};
  sortedKeys.forEach((key) => {
    sortedOffersByCityKey[key] = offersByCityKey[key];
  });

  return sortedOffersByCityKey;
};

export function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { authStatus } = useAppSelector(getUser);
  const { data: favorites, loading } = useAppSelector(getFavoriteOffers);
  const favoritesByCityKey = getOffersByCityKey(favorites);

  useEffect(() => {
    dispatch(checkAuth());
  }
  , [dispatch]);

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  if (authStatus === AuthorizationStatus.NoAuth) {
    <Navigate to={AppRoute.Login} />;
  }


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCityKey).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <PlaceCard
                        key={offer.id}
                        offer={offer}
                        size="small"
                        blockType="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </>
  );
}
