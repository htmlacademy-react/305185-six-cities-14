export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  NotFound: '/not-found-page',
} as const;

export const CityLocation = {
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
} as const;

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
export const MAX_NEARBY_OFFERS = 3;
