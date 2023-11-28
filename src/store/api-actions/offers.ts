import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { OfferPreview } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const';

export const fetchOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.Offers}/fetch`, async (_arg, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  return data;
});

