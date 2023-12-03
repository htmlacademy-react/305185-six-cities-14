import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Offer } from '../../../types/offers';
import { fetchOffer } from '../../api-actions/offer';
import { StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<Offer | null> = {
  data: null,
  loading: false,
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
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.data = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { markAsFavoriteInOffer, unmarkAsFavoriteInOffer } =
  offerData.actions;
