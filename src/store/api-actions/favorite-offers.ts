import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { OfferPreview } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const.js';

export const fetchFavoriteOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.FavoriteOffers}/fetch`, async (_, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Favorite);
  return data;
});
