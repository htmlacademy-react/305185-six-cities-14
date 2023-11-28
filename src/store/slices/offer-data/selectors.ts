import { StoreKey } from '../../../const';
import { RootState, StoreData } from '../../../types/store';
import { Offer } from '../../../types/offers';

export const getOffer = (state: RootState): StoreData<Offer | null> =>
  state[StoreKey.Offer];
