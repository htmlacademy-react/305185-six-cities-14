import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MAX_NEARBY_OFFERS } from '../../const';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { OffersNearby } from '../../components/offers-nearby/offers-nearby';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getOffer, getOffersNearby, getReviews } from '../../store/slices';
import {
  fetchOffer,
  fetchOffersNearby,
  fetchReviews,
} from '../../store/api-actions';
import { Spinner } from '../../components/shared/spinner/spinner';

export function OfferPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data: offer, loading: offerLoading } = useAppSelector(getOffer);
  const { data: offerReviews, loading: reviewsLoading } =
    useAppSelector(getReviews);
  const { data: offersNearby, loading: offersNearbyLoading } =
    useAppSelector(getOffersNearby);
  const offersNearbyLimited = offersNearby.slice(0, MAX_NEARBY_OFFERS);
  const pointsNearby = offersNearby.map(({ id: offerId, location }) => ({
    offerId,
    location,
  }));

  const loading =
    !offer || offerLoading || reviewsLoading || offersNearbyLoading;

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchReviews(id));
      dispatch(fetchOffersNearby(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
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
        <OffersNearby offers={offersNearbyLimited} />
      </div>
    </main>
  );
}
