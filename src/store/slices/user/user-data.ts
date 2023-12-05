import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, RequestStatus, StoreKey } from '../../../const';
import { StoreUserData } from '../../../types/store';
import { User } from '../../../types/user';
import { checkAuth, login, logout } from '../../api-actions';

const initialState: StoreUserData = {
  data: null,
  status: RequestStatus.Idle,
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
        state.status = RequestStatus.Pending;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.status = RequestStatus.Fulfilled;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.data = null;
        state.status = RequestStatus.Rejected;
        state.hasError = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.status = RequestStatus.Fulfilled;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.status = RequestStatus.Rejected;
        state.hasError = true;
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.pending, (state) => {
        state.data = null;
        state.status = RequestStatus.Pending;
        state.hasError = false;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});
