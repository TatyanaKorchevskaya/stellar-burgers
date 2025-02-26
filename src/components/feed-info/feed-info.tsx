import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useBurgerSelector } from '../../services/store';
import {
  selectOrders,
  selectTodayOrders,
  selectTotalOrders
} from '../../slices/stellarBurgerSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const total = useBurgerSelector(selectTotalOrders);
  const totalToday = useBurgerSelector(selectTodayOrders);

  const orders: TOrder[] = useBurgerSelector(selectOrders);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
