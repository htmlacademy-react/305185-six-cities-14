import { OfferReview } from '../types/offers';

export const offerReviews: OfferReview[] = [
  {
    id: '1',
    user: {
      isPro: false,
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-04-24T08:24:56.569Z',
  },
  {
    id: '2',
    user: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    rating: 3,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
  },
];
