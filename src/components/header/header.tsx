import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { HeaderLogo } from './header-logo/header-logo';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { checkAuth, fetchFavoriteOffers } from '../../store/api-actions';
import { getFavoriteOffers, getUser } from '../../store/slices';
import { logout } from '../../store/api-actions/user';
import { HeaderUser } from './header-user/header-user';
import classNames from 'classnames';

export function Header() {
  const dispatch = useAppDispatch();
  const { data: userData, authStatus, status } = useAppSelector(getUser);
  const { data: favoriteOffersData } = useAppSelector(getFavoriteOffers);
  const favoritesCount = favoriteOffersData?.length;

  useEffect(() => {
    if (
      authStatus === AuthorizationStatus.Unknown &&
      status !== RequestStatus.Rejected &&
      status !== RequestStatus.Pending
    ) {
      dispatch(checkAuth());
    }
  }, [authStatus, dispatch, status]);

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const signOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
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
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={AppRoute.Login}
                  onClick={handleLinkClick}
                >
                  <span
                    className={classNames({
                      'header__signout': authStatus === AuthorizationStatus.Auth,
                      'header__login': authStatus === AuthorizationStatus.NoAuth,
                    })}
                  >
                    {actionText}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
