import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import {
  fetchNewOrder,
  selectConstructorItems,
  selectIsAuthenticated,
  selectOrderModalData,
  selectOrderRequest,
  closeOrderRequest
} from '../../slices/stellarBurgerSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useBurgerDispatch();
  const constructorItems = useBurgerSelector(selectConstructorItems);
  const orderRequest = useBurgerSelector(selectOrderRequest);
  const orderModalData = useBurgerSelector(selectOrderModalData);
  const isAuthenticated = useBurgerSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuthenticated) return navigate('/login', { replace: true });
    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        fetchNewOrder([
          constructorItems.bun._id,
          ...ingredientsIds,
          constructorItems.bun._id
        ])
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
