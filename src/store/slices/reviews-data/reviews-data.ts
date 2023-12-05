import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferReview } from '../../../types/offers';
import { addReview, fetchReviews } from '../../api-actions/reviews';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferReview[]> = {
  data: [],
  status: RequestStatus.Idle,
  hasError: false,
};

export const offerReviewsData = createSlice({
  name: StoreKey.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<OfferReview[]>) => {
          state.data = action.payload;
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(fetchReviews.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      })
      .addCase(addReview.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<OfferReview>) => {
        state.data.push(action.payload);
        state.status = RequestStatus.Fulfilled;
        state.hasError = false;
      })
      .addCase(addReview.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      });
  },
});
