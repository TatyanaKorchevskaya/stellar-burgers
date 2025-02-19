import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useBurgerSelector } from '../../services/store';
import { selectUser } from '../../slices/stellarBurgerSlice';

export const AppHeader: FC = () => {
  const user = useBurgerSelector(selectUser);
  return <AppHeaderUI userName={user.name} />;
};
