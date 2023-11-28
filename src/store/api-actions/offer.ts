import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Offer } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const';

export const fetchOffer = createAsyncThunk<
  Offer,
  Offer['id'],
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.Offer}/fetch`, async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});

