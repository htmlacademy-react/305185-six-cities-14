import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../const';
import { OfferPreview } from '../../types/offers';
import { getRatingInPercent } from '../../utils/offers';
import { capitalizeFirstLetter } from '../../utils/common';
import { Bookmark } from '../bookmark/bookmark';

type CardImageSize = 'small' | 'large';
type CardBlockType = 'cities' | 'favorites' | 'near-places';

type PlaceCardProps = {
  offer: OfferPreview;
  size?: CardImageSize;
  blockType?: CardBlockType;
  onCardHover?: (offerId: OfferPreview['id'] | null) => void;
};

const CARD_SIZE_MAP = {
  small: { width: 150, height: 110 },
  large: { width: 260, height: 200 },
};

export function PlaceCardComponent({
  offer,
  size = 'large',
  blockType = 'cities',
  onCardHover,
}: PlaceCardProps) {
  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  function onMouseEnter() {
    onCardHover?.(id);
  }
  function onMouseLeave() {
    onCardHover?.(null);
  }

  return (
    <article
      className={`${blockType}__card place-card`}
      // to avoid listeners creation when onCardHover is not passed
      {...(onCardHover && {
        onMouseEnter,
        onMouseLeave,
      })}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${blockType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            alt="Place image"
            {...CARD_SIZE_MAP[size]}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id={id} isActive={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingInPercent(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export const PlaceCard = memo(PlaceCardComponent);
