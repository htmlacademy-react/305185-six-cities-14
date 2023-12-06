import { SortTypeMap } from '../const';
import { OfferPreview } from '../types/offers';

export function getRatingInPercent(rating: number): string {
  return `${Math.round(rating) * 20}%`;
}

export function sortByRating(a: OfferPreview, b: OfferPreview): number {
  return b.rating - a.rating;
}

export function sortPriceLowToHigh(a: OfferPreview, b: OfferPreview): number {
  return a.price - b.price;
}

export function sortPriceHighToLow(a: OfferPreview, b: OfferPreview): number {
  return b.price - a.price;
}

export const sortOffers: Record<
  string,
  (offers: OfferPreview[]) => OfferPreview[]
> = {
  [SortTypeMap.Popular.key]: (offers) => offers,
  [SortTypeMap.PriceHighToLow.key]: (offers) => offers.toSorted(sortPriceHighToLow),
  [SortTypeMap.PriceLowToHigh.key]: (offers) => offers.toSorted(sortPriceLowToHigh),
  [SortTypeMap.TopRatedFirst.key]: (offers) => offers.toSorted(sortByRating),
};
