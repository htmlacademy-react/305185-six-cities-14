import { Navigate, useParams } from 'react-router-dom';

import { Offer, OfferPreview } from '../../types/offers';
import { AppRoute, CityLocation, MAX_NEARBY_OFFERS } from '../../const';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import OffersNearby from '../../components/offers-nearby/offers-nearby';

type OfferPageProps = {
  offers: Offer[];
  offerPreviews: OfferPreview[];
};

export function OfferPage({ offers, offerPreviews }: OfferPageProps) {
  const { id } = useParams();
  const currentCityLocation = CityLocation.Amsterdam;
  const offer = offers.find((item) => item.id === id);
  const offersNearby = offerPreviews.slice(0, MAX_NEARBY_OFFERS);
  const pointsNearby = offersNearby.map(({ id: offerId, location }) => ({ offerId, location }));

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <OfferDetails offer={offer} />
        <Map
          points={pointsNearby}
          location={currentCityLocation}
          className="offer__map"
        />
        <div className="container">
          <OffersNearby offers={offersNearby} />
        </div>
      </main>
    </div>
  );
}
