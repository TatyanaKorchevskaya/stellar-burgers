import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import { selectUserOrders } from '../../slices/stellarBurgerSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useBurgerDispatch();
 useEffect(() => {}, [])
  const orders: TOrder[] = useBurgerSelector(selectUserOrders) || [];

  return <ProfileOrdersUI orders={orders} />;
};
