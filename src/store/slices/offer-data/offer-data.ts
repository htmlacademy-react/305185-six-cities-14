import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Offer, OfferPreview } from '../../../types/offers';
import { fetchOffer } from '../../api-actions/offer';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';
import {
  addFavoriteOffer,
  removeFavoriteOffer,
} from '../../api-actions/favorite-offers';
import { logout } from '../../api-actions';

const initialState: StoreData<Offer | null> = {
  data: null,
  status: RequestStatus.Idle,
  hasError: false,
};

export const offerData = createSlice({
  name: StoreKey.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.data = action.payload;
        state.status = RequestStatus.Fulfilled;
        state.hasError = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      })
      .addCase(
        addFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          const offer = state.data;
          if (offer && offer.id === action.payload.id) {
            offer.isFavorite = true;
          }
        }
      )
      .addCase(
        removeFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          const offer = state.data;
          if (offer && offer.id === action.payload.id) {
            offer.isFavorite = false;
          }
        }
      )
      .addCase(logout.fulfilled, (state) => {
        if (state.data) {
          state.data.isFavorite = false;
        }
      });
  },
});
