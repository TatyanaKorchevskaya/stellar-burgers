import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import {
  fetchIngredients,
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/stellarBurgerSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useBurgerDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
  }, []);
  const orders = useBurgerSelector(selectUserOrders);

  if (!orders) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
}; 
