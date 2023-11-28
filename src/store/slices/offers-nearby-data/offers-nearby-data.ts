import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import { fetchOffersNearby } from '../../api-actions/offers-nearby';
import { StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';


const initialState: StoreData<OfferPreview[]> = {
  data: [],
  loading: false,
  hasError: false,
};

export const offersNearbyData = createSlice({
  name: StoreKey.OffersNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearby.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        fetchOffersNearby.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});
