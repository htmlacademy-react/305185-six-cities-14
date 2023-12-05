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
  const { data } = await api.get<OfferReview[]>(
    `${APIRoute.Reviews}/${offerId}`
  );
  return data;
});

export const addReview = createAsyncThunk<
  OfferReview,
  { offerId: OfferReview['id']; review: Pick<OfferReview, 'comment' | 'rating'> },
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.Reviews}/add`, async ({ offerId, review }, { extra: api }) => {
  const { data } = await api.post<OfferReview>(
    `${APIRoute.Reviews}/${offerId}`,
    review
  );
  return data;
});
