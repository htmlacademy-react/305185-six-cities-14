import { StoreKey } from '../../../const';
import { OfferPreview } from '../../../types/offers';
import { StoreData, RootState } from '../../../types/store';

export const getFavoriteOffers = (state: RootState): StoreData<OfferPreview[]> =>
  state[StoreKey.FavoriteOffers];
