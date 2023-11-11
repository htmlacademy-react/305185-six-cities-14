import { Offer, OfferPreview } from '../types/offers';

export function getOfferPreview(
  offer: Offer,
  previewImage: string
): OfferPreview {
  const {
    id,
    isPremium,
    price,
    rating,
    title,
    type,
    location,
    city,
    isFavorite,
  } = offer;

  return {
    id,
    title,
    isPremium,
    price,
    rating,
    type,
    city,
    isFavorite,
    previewImage,
    location,
  };
}

export function getOfferPreviews(
  offers: Offer[],
  previewImageFolderUrl: string
): OfferPreview[] {
  return offers.map((offer, idx) => {
    const previewImageUrl = `${previewImageFolderUrl}/${idx + 1}.jpg`;
    return getOfferPreview(offer, previewImageUrl);
  });
}
