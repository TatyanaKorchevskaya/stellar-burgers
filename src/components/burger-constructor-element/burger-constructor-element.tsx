import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useBurgerDispatch } from '../../services/store';
import {
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../slices/stellarBurgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useBurgerDispatch();
    const handleMoveDown = () => dispatch(moveIngredientDown(ingredient));

    const handleMoveUp = () => dispatch(moveIngredientUp(ingredient));

    const handleClose = () => dispatch(deleteIngredient(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
