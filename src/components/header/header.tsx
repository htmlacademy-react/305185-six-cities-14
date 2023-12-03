import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { HeaderLogo } from './header-logo/header-logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { checkAuth, fetchFavoriteOffers } from '../../store/api-actions';
import { getFavoriteOffers, getUser } from '../../store/slices';
import { logout } from '../../store/api-actions/user';
import { HeaderUser } from './header-user/header-user';

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData, authStatus } = useAppSelector(getUser);
  const { data: favoriteOffersData } = useAppSelector(getFavoriteOffers);
  const favoritesCount = favoriteOffersData?.length;

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const signOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout()).then(() => navigate(AppRoute.Login));
  };

  const handleLinkClick =
    authStatus === AuthorizationStatus.Auth ? signOut : undefined;

  const actionText =
    authStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <HeaderLogo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthorizationStatus.Auth && userData && (
                <HeaderUser
                  email={userData?.email}
                  favoritesCount={favoritesCount}
                />
              )}
              {authStatus !== AuthorizationStatus.Unknown && (
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.Login}
                    onClick={handleLinkClick}
                  >
                    <span className="header__signout">{actionText}</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
