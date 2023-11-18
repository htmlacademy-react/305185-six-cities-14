import { store } from '../store';

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
