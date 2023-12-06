import { OfferReview } from '../../../../types/offers';
import { getRatingInPercent } from '../../../../utils/offers';

type ReviewsItemProps = {
  review: OfferReview;
};

export function ReviewsItem({ review }: ReviewsItemProps) {
  const { comment, date, rating, user } = review;
  const dateTimeAttr = new Date(date).toISOString().split('T')[0];
  const reviewDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
            loading="lazy"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingInPercent(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dateTimeAttr}>
          {reviewDate}
        </time>
      </div>
    </li>
  );
}
