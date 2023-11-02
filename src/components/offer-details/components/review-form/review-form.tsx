import { ChangeEvent, useState } from 'react';
import Rating from './components/rating/rating';

function ReviewForm() {
  const MIN_COMMENT_LENGTH = 50;
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isValid = comment.length > MIN_COMMENT_LENGTH && rating !== 0;

  function commentChangeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }
  function ratingChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setRating(Number(e.target.value));
  }

  return (
    <form className="form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating onChange={ratingChangeHandler} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={commentChangeHandler}
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
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
