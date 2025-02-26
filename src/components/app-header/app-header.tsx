import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useBurgerSelector } from '../../services/store';
import { selectUser } from '../../slices/stellarBurgerSlice';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const user = useBurgerSelector(selectUser);
  const location = useLocation();
  return <AppHeaderUI userName={user.name} location={location} />;
};
