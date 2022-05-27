import * as React from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import CaloricContentItem from '../components/caloric-content-item/caloric-content-item';
import caloriccontentStyles from '../components/caloric-content/caloric-content.module.css';
import ingredientStyles from './ingredient.module.css';

export function IngredientPage() {
  const { ingredients } = useSelector(state => state.ingredients);
  const id = useParams<{ id?: string }>().id!.slice(1);
  const ingredient = ingredients.find(({ _id }) => _id === id);

  return (
    <div className={ingredientStyles.container}>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>
      <figure className={ingredientStyles.card}>
        <img 
          className={'mb-4 ' + ingredientStyles.card__image} 
          src={ingredient?.image_large} 
          alt={ingredient?.name} 
        /> 
        <figcaption 
          className={'text text_type_main-medium ' + 
          ingredientStyles.card__caption}
        >
          {ingredient?.name}
        </figcaption>
      </figure>
      <ul className={'mt-8 mb-5 ' + caloriccontentStyles.list}>
        <CaloricContentItem title='Калории,ккал' quantity={ingredient?.calories!} />
        <CaloricContentItem title='Белки, г' quantity={ingredient?.proteins!} />
        <CaloricContentItem title='Жиры, г' quantity={ingredient?.fat!} />
        <CaloricContentItem title='Углеводы, г' quantity={ingredient?.carbohydrates!} />
      </ul>
      </div>
      );
}