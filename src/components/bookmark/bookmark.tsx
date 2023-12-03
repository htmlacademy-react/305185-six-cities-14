import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { OfferPreview } from '../../types/offers';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getUser } from '../../store/slices';
import {
  addFavoriteOffer,
  removeFavoriteOffer,
} from '../../store/api-actions/favorite-offers';

type BookmarkProps = {
  id: OfferPreview['id'];
  isActive: OfferPreview['isFavorite'];
  block?: string;
  size?: 'small' | 'large';
};

const ICON_SIZE_MAP = {
  small: { width: 18, height: 19 },
  large: { width: 31, height: 33 },
};

export function Bookmark({
  id,
  isActive,
  size = 'small',
  block = 'place-card',
}: BookmarkProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authStatus } = useAppSelector(getUser);

  const handleClick = () => {
    if (authStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }

    if (isActive) {
      dispatch(removeFavoriteOffer(id));
    } else {
      dispatch(addFavoriteOffer(id));
    }
  };

  return (
    <button
      className={classNames(`${block}__bookmark-button button`, {
        'place-card__bookmark-button--active': isActive,
      })}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${block}__bookmark-icon`} {...ICON_SIZE_MAP[size]}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isActive ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}
