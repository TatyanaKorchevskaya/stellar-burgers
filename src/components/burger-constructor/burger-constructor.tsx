import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import {
  fetchNewOrder,
  selectConstructorItems,
  selectIsAuthenticated,
  selectOrderModalData,
  selectOrderRequest
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
    // if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) return navigate('/login');
    const ingredientsId = constructorItems.ingredients.map((item) => item._id);
    dispatch(fetchNewOrder([
      constructorItems.bun._id,
      ...ingredientsId,
  
    ]))
  };
  const closeOrderModal = () => {};

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
