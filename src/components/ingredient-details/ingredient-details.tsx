import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/inglidientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector(ingredientsSelectors.getIngredients).find(
    (item) => item._id === id
  );
  if (!ingredientData) {
    return <Preloader />;
  }
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
