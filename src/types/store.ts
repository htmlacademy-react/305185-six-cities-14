import { store } from '../store';
import { User } from './user';
import { AuthorizationStatus, RequestStatus } from '../const';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type StoreData<T> = {
  data: T;
  status: typeof RequestStatus[keyof typeof RequestStatus];
  hasError: boolean;
};

export type StoreUserData = StoreData<User | null> & {
  authStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
};
