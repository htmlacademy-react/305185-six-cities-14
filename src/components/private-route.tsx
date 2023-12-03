import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/store';
import { checkAuth } from '../store/api-actions';
import { getUser } from '../store/slices';
import { AppRoute, AuthorizationStatus } from '../const';
import { Spinner } from './shared/spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { authStatus } = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const hasAccess = authStatus === AuthorizationStatus.Auth;

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (hasAccess && children) || <Navigate to={AppRoute.Login} />;
}
