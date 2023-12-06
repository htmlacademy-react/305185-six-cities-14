import { AuthorizationStatus, MAX_REVIEWS } from '../../../../const';
import { useAppSelector } from '../../../../hooks/store';
import { getUser } from '../../../../store/slices';
import { Offer, OfferReview } from '../../../../types/offers';
import { ReviewForm } from '../review-form/review-form';
import { ReviewsItem } from './reviews-item';

type ReviewsProps = {
  offerId: Offer['id'];
  reviews: OfferReview[];
  className?: string;
};

export function Reviews({
  offerId,
  reviews,
  className = 'offer__reviews',
}: ReviewsProps) {
  // get 10 latest reviews and sort them by date
  const reviewsLimited = reviews
    .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, MAX_REVIEWS);

  const { authStatus } = useAppSelector(getUser);
  const isAuthorized = authStatus === AuthorizationStatus.Auth;
  return (
    <section className={`${className} reviews`}>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsLimited.map((review) => (
          <ReviewsItem key={review.id} review={review} />
        ))}
      </ul>
      {isAuthorized && <ReviewForm offerId={offerId} />}
    </section>
  );
}
