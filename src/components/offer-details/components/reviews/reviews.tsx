import { OfferReview } from '../../../../types/offers';
import { ReviewForm } from '../review-form/review-form';
import { ReviewsList } from './reviews-list';

type ReviewsProps = {
  reviews: OfferReview[];
  className?: string;
};

export function Reviews({ reviews, className }: ReviewsProps) {
  return (
    <section className={`${className} reviews`}>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewsList reviews={reviews} />
      <ReviewForm />
    </section>
  );
}
