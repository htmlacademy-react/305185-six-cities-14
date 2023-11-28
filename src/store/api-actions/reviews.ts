import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { OfferReview } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const.js';

export const fetchReviews = createAsyncThunk<
  OfferReview[],
  OfferReview['id'],
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.Reviews}/fetch`, async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferReview[]>(`${APIRoute.Reviews}/${offerId}`);
  return data;
});

