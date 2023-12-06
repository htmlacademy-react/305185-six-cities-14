import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute, StoreKey } from '../../const';
import { User } from '../../types/user';
import { AxiosInstance } from 'axios';
import { getAuthToken, removeAuthToken, saveAuthToken } from '../../services/token';

export const checkAuth = createAsyncThunk<
  User,
  undefined,
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.User}/checkAuth`, async (_arg, { extra: api }) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Token is not defined');
  }
  const { data } = await api.get<User>(APIRoute.Login);
  return data;
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.User}/login`, async (authData, { extra: api }) => {
  const { data } = await api.post<User>(APIRoute.Login, authData);
  saveAuthToken(data.token);
  return data;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    extra: AxiosInstance;
  }
>(`${StoreKey.User}/logout`, async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  removeAuthToken();
});
