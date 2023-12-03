import { combineReducers } from '@reduxjs/toolkit';
import {
  offersData,
  offerData,
  offersNearbyData,
  favoriteOffersData,
  offerReviewsData,
  userData,
} from './slices/';

export const rootReducer = combineReducers({
  [offersData.name]: offersData.reducer,
  [offerData.name]: offerData.reducer,
  [offersNearbyData.name]: offersNearbyData.reducer,
  [favoriteOffersData.name]: favoriteOffersData.reducer,
  [offerReviewsData.name]: offerReviewsData.reducer,
  [userData.name]: userData.reducer,
});
