import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  fetchFeed,
  fetchIngredients,
  selectIngredients,
  selectOrders
} from '../../slices/stellarBurgerSlice';
import { setTimeout } from 'timers/promises';

export const OrderInfo: FC = () => {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const orders = useBurgerSelector(selectOrders);

  const orderData = orders.find((item) => item.number === parseInt(orderId!));

  const ingredients: TIngredient[] = useBurgerSelector(selectIngredients);

  /* Готовим данные для отображения */

  const orderInfo = useMemo(() => {
    console.log(orders, orderData, ingredients);
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
