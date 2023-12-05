import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import { fetchOffersNearby } from '../../api-actions/offers-nearby';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  status: RequestStatus.Idle,
  hasError: false,
};

export const offersNearbyData = createSlice({
  name: StoreKey.OffersNearby,
  initialState,
  reducers: {
    markAsFavoriteInOffersNearby: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = true;
      }
    },
    unmarkAsFavoriteInOffersNearby: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = false;
      }
    },
  },
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
      });
  },
});

export const { markAsFavoriteInOffersNearby, unmarkAsFavoriteInOffersNearby } =
  offersNearbyData.actions;
