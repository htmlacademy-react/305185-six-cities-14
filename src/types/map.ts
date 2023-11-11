import { Offer, OfferLocation } from './offers';

export type MapPoint = {
  offerId: Offer['id'];
  location: OfferLocation;
}
