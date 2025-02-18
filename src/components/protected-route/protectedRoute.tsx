import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectIsInit
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '../ui/preloader';
import { useBurgerSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly
}: ProtectedRouteProps) => {
  const isAuthenticated = useBurgerSelector(selectIsAuthenticated);
  const isInit = useBurgerSelector(selectIsInit);
  const location = useLocation();

  if (!isInit) {
    console.log('p-r pre');
    return <Preloader />;
  }

  if (!unAuthOnly && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuthOnly && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
