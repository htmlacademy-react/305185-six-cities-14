import { combineReducers } from '@reduxjs/toolkit';
import {
  offersData,
  offerData,
  offersNearbyData,
  favoriteOffersData,
  offerReviewsData,
  userData,
} from './slices/';
import { StoreKey } from '../const';

export const rootReducer = combineReducers({
  [StoreKey.Offers]: offersData.reducer,
  [StoreKey.Offer]: offerData.reducer,
  [StoreKey.OffersNearby]: offersNearbyData.reducer,
  [StoreKey.FavoriteOffers]: favoriteOffersData.reducer,
  [StoreKey.Reviews]: offerReviewsData.reducer,
  [StoreKey.User]: userData.reducer,
});
