import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import { fetchOffersNearby } from '../../api-actions/offers-nearby';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';
import {
  addFavoriteOffer,
  removeFavoriteOffer,
} from '../../api-actions/favorite-offers';
import { logout } from '../../api-actions';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  status: RequestStatus.Idle,
  hasError: false,
};

export const offersNearbyData = createSlice({
  name: StoreKey.OffersNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearby.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        fetchOffersNearby.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      })
      .addCase(
        addFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          const offer = state.data.find(({ id }) => id === action.payload.id);
          if (offer) {
            offer.isFavorite = true;
          }
        }
      )
      .addCase(
        removeFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          const offer = state.data.find(({ id }) => id === action.payload.id);
          if (offer) {
            offer.isFavorite = false;
          }
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.data.map((offer) => {
          offer.isFavorite = false;
        });
      });
  },
});
