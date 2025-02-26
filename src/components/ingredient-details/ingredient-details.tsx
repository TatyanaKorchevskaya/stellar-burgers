import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useBurgerSelector } from '../../services/store';
import { selectIngredients } from '../../slices/stellarBurgerSlice';

export const IngredientDetails: FC = () => {
  const params = useParams<{ id: string }>();
  const ingredientId = params.id;
  const ingredients = useBurgerSelector(selectIngredients);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id == ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
