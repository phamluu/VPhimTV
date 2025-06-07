import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return children;
}
