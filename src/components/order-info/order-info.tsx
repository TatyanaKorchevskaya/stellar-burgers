import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  fetchFeed,
  fetchIngredients,
  fetchUserOrders,
  removeUserOrders,
  selectIngredients,
  selectOrders,
  selectUserOrders
} from '../../slices/stellarBurgerSlice';
import { setTimeout } from 'timers/promises';

export const OrderInfo: FC = () => {
  const dispatch = useBurgerDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
  }, []);
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const orders = useBurgerSelector(selectOrders);
  const userOrders = useBurgerSelector(selectUserOrders);

  const allOrders = orders.concat(userOrders!);
  let orderData: TOrder | undefined;
  try {
    orderData = allOrders.find((item) => item.number === parseInt(orderId!));
  } catch (error) {
    orderData = orders.find((item) => item.number === parseInt(orderId!));
  }

  const ingredients: TIngredient[] = useBurgerSelector(selectIngredients);

  const orderInfo = useMemo(() => {
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
