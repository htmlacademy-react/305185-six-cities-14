import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/store';
import { getUser } from '../store/slices';
import { AppRoute, AuthorizationStatus } from '../const';
import { Spinner } from './shared/spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { authStatus } = useAppSelector(getUser);

  const hasAccess = authStatus === AuthorizationStatus.Auth;

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (hasAccess && children) || <Navigate to={AppRoute.Login} />;
}
