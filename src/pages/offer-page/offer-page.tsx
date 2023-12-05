import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoute, MAX_NEARBY_OFFERS, RequestStatus } from '../../const';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { OffersNearby } from '../../components/offers-nearby/offers-nearby';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getOffer, getOffersNearby } from '../../store/slices';
import {
  fetchOffer,
  fetchOffersNearby,
  fetchReviews,
} from '../../store/api-actions';
import { Spinner } from '../../components/shared/spinner/spinner';

export function OfferPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: offer, status: offerStatus } = useAppSelector(getOffer);
  const { data: offersNearby, status: offersNearbyStatus } =
    useAppSelector(getOffersNearby);
  const offersNearbyLimited = offersNearby.slice(0, MAX_NEARBY_OFFERS);
  const pointsNearby = offersNearbyLimited.map(({ id: offerId, location }) => ({
    offerId,
    location,
  }));

  const isOfferPending = offerStatus === RequestStatus.Pending;
  const isOfferRejected = offerStatus === RequestStatus.Rejected;
  const isOffersNearbyPending = offersNearbyStatus === RequestStatus.Pending;
  const isLoading = isOfferPending || isOffersNearbyPending;

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchReviews(id));
      dispatch(fetchOffersNearby(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isOfferRejected) {
      navigate(AppRoute.NotFound);
    }
  }, [offer, navigate, isOfferRejected]);

  return (
    ((!isLoading && offer) && (
      <main className="page__main page__main--offer">
        <OfferDetails offer={offer} />
        <Map
          points={pointsNearby}
          location={offer.city.location}
          className="offer__map"
        />
        <div className="container">
          <OffersNearby offers={offersNearbyLimited} />
        </div>
      </main>
    )) || <Spinner />
  );
}
