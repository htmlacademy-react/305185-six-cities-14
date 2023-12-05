import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Offer } from '../../../types/offers';
import { fetchOffer } from '../../api-actions/offer';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<Offer | null> = {
  data: null,
  status: RequestStatus.Idle,
  hasError: false,
};

export const offerData = createSlice({
  name: StoreKey.Offer,
  initialState,
  reducers: {
    markAsFavoriteInOffer: (state, action) => {
      const offer = state.data;
      if (offer && offer.id === action.payload) {
        offer.isFavorite = true;
      }
    },
    unmarkAsFavoriteInOffer: (state, action) => {
      const offer = state.data;
      if (offer && offer.id === action.payload) {
        offer.isFavorite = false;
      }
    },
  },
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
      });
  },
});

export const { markAsFavoriteInOffer, unmarkAsFavoriteInOffer } =
  offerData.actions;
