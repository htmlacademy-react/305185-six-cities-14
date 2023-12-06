import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/store';

import { Rating } from './rating/rating';
import { addReview } from '../../../../store/api-actions';
import { Offer } from '../../../../types/offers';
import { getReviews } from '../../../../store/slices';
import { RequestStatus } from '../../../../const';

const MIN_COMMENT_LENGTH = 50;

type ReviewFormProps = {
  offerId: Offer['id'];
};

export function ReviewForm({ offerId }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isValid = comment.length > MIN_COMMENT_LENGTH && rating !== 0;
  const { status } = useAppSelector(getReviews);
  const isLoading = status === RequestStatus.Pending;

  function handleCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }
  function handleRatingChange(e: ChangeEvent<HTMLInputElement>) {
    setRating(Number(e.target.value));
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (isValid) {
      const review = {
        comment,
        rating,
      };
      dispatch(addReview({ offerId, review })).then(() => {
        setComment('');
        setRating(0);
      });
    }
  }

  return (
    <form className="form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating onChange={handleRatingChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isLoading || !isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
