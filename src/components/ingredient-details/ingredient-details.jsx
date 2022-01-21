import React from 'react';
import ingredientdetailsStyles from './ingredient-details.module.css';

const CaloricContentItem = (props) => {
  return (
    <li className={'mr-5 ' + ingredientdetailsStyles.item}>
      <h4 className='text text_type_main-default text_color_inactive'>{props.title}</h4>
      <span className='text text_type_digits-default text_color_inactive'>{props.quantity}</span>
    </li>
  );
};


const CaloricContent = ({ card }) => {
  const {
    calories,
    proteins,
    fat,
    carbohydrates
  } = card;
  return (
    <ul className={'mt-8 mb-5 ' + ingredientdetailsStyles.list}>
      <CaloricContentItem title='Калории,ккал' quantity={calories} />
      <CaloricContentItem title='Белки, г' quantity={proteins} />
      <CaloricContentItem title='Жиры, г' quantity={fat} />
      <CaloricContentItem title='Углеводы, г' quantity={carbohydrates} />
    </ul>
  );
};

function IngredientDetails({ card }) {
  const { image_large, name } = card;
  return (
    <div className={ingredientdetailsStyles.container}>
      <figure className={ingredientdetailsStyles.card}>
        <img 
          className={'mb-4 ' + ingredientdetailsStyles.card__image} 
          src={image_large} 
          alt={name} 
        />
        <figcaption 
          className={'text text_type_main-medium ' + 
          ingredientdetailsStyles.card__caption}
        >
          {name}
        </figcaption>
      </figure>
      <CaloricContent card={card}/>
    </div>
  );
}

export default IngredientDetails;