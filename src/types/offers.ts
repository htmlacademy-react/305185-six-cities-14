// TODO: Break the types into separate files if needed in the future
export type Offer = {
  id: number;
  title: string;
  city: OfferCity;
  previewImage: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: OfferHost;
  description: string;
  location: OfferLocation;
};

type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type OfferCity = {
  name: string;
  location: OfferLocation;
};

type OfferHost = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type OfferPreview = Pick<
  Offer,
  'id' | 'isPremium' | 'previewImage' | 'price' | 'rating' | 'title' | 'type'
>;
