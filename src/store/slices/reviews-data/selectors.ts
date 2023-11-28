import { StoreKey } from '../../../const';
import { RootState, StoreData } from '../../../types/store';
import { OfferReview } from '../../../types/offers';

export const getReviews = (state: RootState): StoreData<OfferReview[]> =>
  state[StoreKey.Reviews];
