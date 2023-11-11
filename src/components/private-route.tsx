import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  hasAccess?: boolean;
  children: JSX.Element;
};

export function PrivateRoute({
  hasAccess = false,
  children,
}: PrivateRouteProps): JSX.Element {
  return (hasAccess && children) || <Navigate to={'/login'} />;
}
