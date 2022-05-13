import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useSelector } from '../../services/hooks';
import PropTypes from 'prop-types';
import IngredientsItem from '../ingredients-item/ingredients-item';
import ingredientslistStyles from './ingredients-list.module.css';
import { FC } from 'react';

interface IIngredientsListProps {
  type: string;
};


const IngredientsList: FC<IIngredientsListProps> = ({ type }) => {
  const { 
    ingredients, ingredientsRequest, ingredientsFailed 
  } = useSelector(state => state.ingredients);
  const ingredientsType = ingredients.filter((item) => item.type === type);

  if (ingredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (ingredientsRequest) {
    return <p>Загрузка...</p>
  } else {
    return (
      <ul className={'pt-2 pb-1 pl-1 pr-1 ' + ingredientslistStyles.list}>
        {ingredientsType.map(item => (
          <IngredientsItem key={item._id} card={item} />
        ))}
      </ul>
    );
  }
}

IngredientsList.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

export default IngredientsList;