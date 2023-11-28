import { StoreKey } from '../../../const';
import { RootState, StoreData } from '../../../types/store';
import { OfferPreview } from '../../../types/offers';

export const getOffersNearby = (state: RootState): StoreData<OfferPreview[]> =>
  state[StoreKey.OffersNearby];
