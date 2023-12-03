import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { OfferPreview } from '../../types/offers.js';
import { APIRoute, StoreKey } from '../../const.js';
import { markOfferAsFavorite, unmarkOfferAsFavorite } from '../slices/offers-data/offers-data.js';

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

export const addFavoriteOffer = createAsyncThunk<
  OfferPreview,
  OfferPreview['id'],
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.FavoriteOffers}/add`, async (offerId, { extra: api, dispatch }) => {
  const { data } = await api.post<OfferPreview>(
    `${APIRoute.Favorite}/${offerId}/1`
  );
  dispatch(markOfferAsFavorite(offerId));
  return data;
});

export const removeFavoriteOffer = createAsyncThunk<
  OfferPreview,
  OfferPreview['id'],
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.FavoriteOffers}/remove`, async (offerId, { extra: api, dispatch }) => {
  const { data } = await api.post<OfferPreview>(
    `${APIRoute.Favorite}/${offerId}/0`
  );
  dispatch(unmarkOfferAsFavorite(offerId));
  return data;
});
