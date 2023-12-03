import { Link } from 'react-router-dom';

import { AppRoute } from '../../../const';

type HeaderUserProps = {
  email: string;
  favoritesCount: number;
};

export function HeaderUser({ email, favoritesCount = 0 }: HeaderUserProps) {
  return (
    <li className="header__nav-item user">
      <Link
        className="header__nav-link header__nav-link--profile"
        to={AppRoute.Favorites}
      >
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__user-name user__name">{email}</span>
        <span className="header__favorite-count">{favoritesCount}</span>
      </Link>
    </li>
  );
}
