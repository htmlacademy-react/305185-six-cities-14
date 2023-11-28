import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { OfferPreview } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const.js';

export const fetchOffersNearby = createAsyncThunk<
  OfferPreview[],
  OfferPreview['id'],
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.OffersNearby}/fetch`, async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(
    `${APIRoute.Offers}/${offerId}${APIRoute.OffersNearby}`
  );
  return data;
});
