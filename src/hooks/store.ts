import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { StoreState, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
