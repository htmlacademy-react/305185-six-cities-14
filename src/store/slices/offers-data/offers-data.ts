import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import { fetchOffers } from '../../api-actions/offers';
import { StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  loading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: StoreKey.Offers,
  initialState,
  reducers: {
    markOfferAsFavorite: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = true;
      }
    },
    unmarkOfferAsFavorite: (state, action: PayloadAction<string>) => {
      const offer = state.data.find(({ id }) => id === action.payload);
      if (offer) {
        offer.isFavorite = false;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        fetchOffers.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(fetchOffers.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { markOfferAsFavorite, unmarkOfferAsFavorite } = offersData.actions;
