import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, StoreKey } from '../../../const';
import { checkAuth, login, logout } from '../../api-actions/user';
import { StoreUserData } from '../../../types/store';
import { User } from '../../../types/user';

const initialState: StoreUserData = {
  data: null,
  loading: false,
  hasError: false,
  authStatus: AuthorizationStatus.Unknown,
};

export const userData = createSlice({
  name: StoreKey.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.loading = false;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.hasError = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.loading = false;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.loading = false;
        state.hasError = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});
