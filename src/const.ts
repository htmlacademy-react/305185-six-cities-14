import { OfferCity } from './types/offers';

export const API_URL = 'https://14.design.pages.academy/six-cities';

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  NotFound: '/not-found-page',
} as const;

export const StoreKey = {
  Offers: 'OFFERS',
  Offer: 'OFFER',
  OffersNearby: 'OFFERS_NEARBY',
  FavoriteOffers: 'FAVORITE_OFFERS',
  Reviews: 'REVIEWS',
  User: 'USER',
} as const;

export const APIRoute = {
  Offers: '/offers',
  OffersNearby: '/nearby',
  Reviews: '/comments',
  Favorite: '/favorite',
  Login: '/login',
  Logout: '/logout',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const MAP_MARKER_URL = {
  Default: 'img/pin.svg',
  Current: 'img/pin-active.svg',
} as const;

export const MAX_NEARBY_OFFERS = 3;
export const MAX_REVIEWS = 10;

export const RequestStatus = {
  Idle: 'idle',
  Pending: 'pending',
  Fulfilled: 'fulfilled',
  Rejected: 'rejected',
} as const;

export const CityMap: { [key: string]: OfferCity } = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
} as const;

export const SortTypeMap = {
  Popular: {
    label: 'Popular',
    key: 'Popular',
  },
  PriceLowToHigh: {
    label: 'Price: low to high',
    key: 'PriceLowToHigh',
  },
  PriceHighToLow: {
    label: 'Price: high to low',
    key: 'PriceHighToLow',
  },
  TopRatedFirst: {
    label: 'Top rated first',
    key: 'TopRatedFirst',
  },
} as const;
