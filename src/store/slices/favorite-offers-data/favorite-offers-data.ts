import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OfferPreview } from '../../../types/offers';
import {
  addFavoriteOffer,
  fetchFavoriteOffers,
  removeFavoriteOffer,
} from '../../api-actions/favorite-offers';
import { StoreKey } from '../../../const';
import { StoreData } from '../../../types/store';

const initialState: StoreData<OfferPreview[]> = {
  data: [],
  loading: false,
  hasError: false,
};

export const favoriteOffersData = createSlice({
  name: StoreKey.FavoriteOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        fetchFavoriteOffers.fulfilled,
        (state, action: PayloadAction<OfferPreview[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(addFavoriteOffer.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        addFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          state.data.push(action.payload);
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(addFavoriteOffer.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      })
      .addCase(removeFavoriteOffer.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        removeFavoriteOffer.fulfilled,
        (state, action: PayloadAction<OfferPreview>) => {
          state.data = state.data.filter(({ id }) => id !== action.payload.id);
          state.loading = false;
          state.hasError = false;
        }
      )
      .addCase(removeFavoriteOffer.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});
