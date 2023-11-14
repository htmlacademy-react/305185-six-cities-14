import { Navigate, useParams } from 'react-router-dom';

import { Offer, OfferPreview } from '../../types/offers';
import { AppRoute, CityLocation, MAX_NEARBY_OFFERS } from '../../const';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { OffersNearby } from '../../components/offers-nearby/offers-nearby';

type OfferPageProps = {
  offers: Offer[];
  offerPreviews: OfferPreview[];
};

export function OfferPage({ offers, offerPreviews }: OfferPageProps) {
  const { id } = useParams();
  const currentCityLocation = CityLocation.Amsterdam;
  const offer = offers.find((item) => item.id === id);
  const offersNearby = offerPreviews.slice(0, MAX_NEARBY_OFFERS);
  const pointsNearby = offersNearby.map(({ id: offerId, location }) => ({
    offerId,
    location,
  }));

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
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
  );
}
