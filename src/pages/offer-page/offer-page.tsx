import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MAX_NEARBY_OFFERS } from '../../const';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { OffersNearby } from '../../components/offers-nearby/offers-nearby';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchOffer, fetchOfferReviews, fetchOffersNearby, resetOffer } from '../../store/actions';

export function OfferPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offer);
  const offerReviews = useAppSelector((state) => state.offerReviews);
  const offersNearby = useAppSelector((state) => state.offersNearby).slice(
    0,
    MAX_NEARBY_OFFERS
  );
  const pointsNearby = offersNearby.map(({ id: offerId, location }) => ({
    offerId,
    location,
  }));

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchOfferReviews(id));
      dispatch(fetchOffersNearby(id));
    }

    return () => {
      dispatch(resetOffer());
    };
  }, [id, dispatch]);

  if (!offer) {
    return 'Loading...';
  }

  return (
    <main className="page__main page__main--offer">
      <OfferDetails offer={offer} reviews={offerReviews} />
      <Map
        points={pointsNearby}
        location={offer.city.location}
        className="offer__map"
      />
      <div className="container">
        <OffersNearby offers={offersNearby} />
      </div>
    </main>
  );
}
