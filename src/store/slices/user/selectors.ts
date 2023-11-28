import { StoreKey } from '../../../const';
import { RootState, StoreUserData } from '../../../types/store';

export const getUser = (state: RootState): StoreUserData =>
  state[StoreKey.User];
