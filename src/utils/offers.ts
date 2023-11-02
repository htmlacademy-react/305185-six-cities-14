import { Offer, OfferPreview } from '../types/offers';

export function getOfferPreview(offer: Offer): OfferPreview {
  const {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  return {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  };
}

export function getOfferPreviews(offers: Offer[]): OfferPreview[] {
  return offers.map(getOfferPreview);
}

export function getRatingInPercent(rating: number): string {
  return `${Math.round(rating * 20)}%`;
}
