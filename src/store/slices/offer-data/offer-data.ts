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
  reducers: {},
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
