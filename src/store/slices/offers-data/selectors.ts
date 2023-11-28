import { StoreKey } from '../../../const';
import { RootState, StoreData } from '../../../types/store';
import { OfferPreview } from '../../../types/offers';

export const getOffers = (state: RootState): StoreData<OfferPreview[]> =>
  state[StoreKey.Offers];
