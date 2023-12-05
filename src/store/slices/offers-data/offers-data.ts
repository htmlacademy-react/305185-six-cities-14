import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import { fetchOffers } from '../../api-actions/offers';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  status: RequestStatus.Idle,
  hasError: false,
};

export const offersData = createSlice({
  name: StoreKey.Offers,
  initialState,
  reducers: {
    markAsFavoriteInOffers: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = true;
      }
    },
    unmarkAsFavoriteInOffers: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = false;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        fetchOffers.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      });
  },
});

export const { markAsFavoriteInOffers, unmarkAsFavoriteInOffers } =
  offersData.actions;
