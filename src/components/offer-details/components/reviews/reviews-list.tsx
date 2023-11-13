import { OfferReview } from '../../../../types/offers';
import { ReviewsItem } from './reviews-item';

type ReviewsProps = {
  reviews: OfferReview[];
};

export function ReviewsList({ reviews }: ReviewsProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
