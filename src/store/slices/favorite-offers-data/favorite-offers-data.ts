import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import {
  addFavoriteOffer,
  fetchFavoriteOffers,
  removeFavoriteOffer,
} from '../../api-actions/favorite-offers';
import { RequestStatus, StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  status: RequestStatus.Idle,
  hasError: false,
};

export const favoriteOffersData = createSlice({
  name: StoreKey.FavoriteOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        fetchFavoriteOffers.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      })
      .addCase(addFavoriteOffer.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        addFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          state.data.push(action.payload);
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(addFavoriteOffer.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      })
      .addCase(removeFavoriteOffer.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
      })
      .addCase(
        removeFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          state.data = state.data.filter(({ id }) => id !== action.payload.id);
          state.status = RequestStatus.Fulfilled;
          state.hasError = false;
        }
      )
      .addCase(removeFavoriteOffer.rejected, (state) => {
        state.status = RequestStatus.Rejected;
        state.hasError = true;
      });
  },
});
