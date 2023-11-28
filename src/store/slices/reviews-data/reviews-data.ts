import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferReview } from '../../../types/offers';
import { fetchReviews } from '../../api-actions/reviews';
import { StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferReview[]> = {
  data: [],
  loading: false,
  hasError: false,
};

export const offerReviewsData = createSlice({
  name: StoreKey.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<OfferReview[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(fetchReviews.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});
