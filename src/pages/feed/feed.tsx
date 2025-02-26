import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import {
  fetchFeed,
  fetchIngredients,
  removeOrders,
  selectOrders
} from '../../slices/stellarBurgerSlice';

export const Feed: FC = () => {
  const dispatch = useBurgerDispatch();
  const orders: TOrder[] = useBurgerSelector(selectOrders);
  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  const handleGetFeeds = () => {
    dispatch(removeOrders());
    dispatch(fetchFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
