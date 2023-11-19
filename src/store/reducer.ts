import { createReducer } from '@reduxjs/toolkit';

import { offers, offerPreviews, offerReviews } from '../mocks';
import { Offer, OfferCity, OfferPreview, OfferReview } from '../types/offers';
import { CityMap } from '../const';
import {
  fetchFavoriteOffers,
  fetchOffer,
  fetchOfferReviews,
  fetchOffersNearby,
  fetchOffers,
  resetOffer,
  setActiveCity,
} from './actions';

const initialState: {
  offers: OfferPreview[];
  offersNearby: OfferPreview[];
  offerReviews: OfferReview[];
  offer: Offer | null;
  favoriteOffers: OfferPreview[];
  activeCity: OfferCity;
} = {
  offers: [],
  offer: null,
  offersNearby: [],
  offerReviews: [],
  favoriteOffers: [],
  activeCity: CityMap.Paris,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state) => {
      state.offers = offerPreviews;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = offers.find((offer) => offer.id === action.payload) || null;
    })
    .addCase(resetOffer, (state) => {
      state.offer = null;
    })
    .addCase(fetchOffersNearby, (state, action) => {
      state.offersNearby = offerPreviews.filter(
        (offer) => offer.id !== action.payload
      );
    })
    .addCase(fetchOfferReviews, (state) => {
      state.offerReviews = offerReviews;
    })
    .addCase(fetchFavoriteOffers, (state) => {
      state.favoriteOffers = state.offers.filter((offer) => offer.isFavorite);
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    });
});

export { reducer };
