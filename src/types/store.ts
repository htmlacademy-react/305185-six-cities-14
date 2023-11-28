import { store } from '../store';
import { User } from './user';
import { AuthorizationStatus } from '../const';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type StoreData<T> = {
  data: T;
  loading: boolean;
  hasError: boolean;
};

export type StoreUserData = StoreData<User | null> & {
  authStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};
