// TODO: Break the types into separate files if needed in the future
export type OfferPreview = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCity;
  location: OfferLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offer = Omit<OfferPreview, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: OfferHost;
  images: string[];
  maxAdults: number;
};

export type OfferReview = Pick<Offer, 'rating'> & {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
};

export type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferCity = {
  name: string;
  location: OfferLocation;
}

type OfferHost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

