import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getIngredientsList,
  getIngredientsState
} from 'src/services/ingredients';
import { AppDispatch } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients } = useSelector(getIngredientsState);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredientsList());
    }
  }, []);

  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
