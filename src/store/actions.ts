import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferCity } from '../types/offers';
import { ActionKey } from '../const';

const Action = {
  Fetch: 'fetch',
  Reset: 'reset',
  Set: 'set',
} as const;

export const fetchOffers = createAction(`${ActionKey.Offers}/${Action.Fetch}`);

export const fetchOffer = createAction<Offer['id']>(`${ActionKey.Offer}/${Action.Fetch}`);

export const resetOffer = createAction(`${ActionKey.Offer}/${Action.Reset}}`);

export const fetchOffersNearby = createAction<Offer['id']>(
  `${ActionKey.OffersNearby}/${Action.Fetch}`
);

export const fetchOfferReviews = createAction<Offer['id']>(
  `${ActionKey.OfferReviews}/${Action.Fetch}`
);

export const fetchFavoriteOffers = createAction(
  `${ActionKey.FavoriteOffers}/${Action.Fetch}`
);

export const setActiveCity = createAction<OfferCity>(
  `${ActionKey.ActiveCity}/${Action.Set}`
);
