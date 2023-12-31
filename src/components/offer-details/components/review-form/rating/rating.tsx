import { Fragment } from 'react';

type RatingProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  disabled?: boolean;
};

const RATING_MAP = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export function Rating({ onChange, value, disabled = false }: RatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(RATING_MAP)
        .reverse()
        .map(([score, title]) => (
          <Fragment key={score}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={score}
              id={`${score}-stars`}
              type="radio"
              onChange={onChange}
              disabled={disabled}
              checked={Number(score) === value}
            />
            <label
              htmlFor={`${score}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
    </div>
  );
}
