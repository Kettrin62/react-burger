import React from 'react';
import PropTypes from 'prop-types';
import ingredientdetailsStyles from './ingredient-details.module.css';

const cardPropTypes = PropTypes.shape({
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});

const CaloricContentItem = (props) => {
  return (
    <li className={'mr-5 ' + ingredientdetailsStyles.item}>
      <h4 className='text text_type_main-default text_color_inactive'>{props.title}</h4>
      <span className='text text_type_digits-default text_color_inactive'>{props.quantity}</span>
    </li>
  );
};

CaloricContentItem.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
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

CaloricContent.propTypes = {
  card: cardPropTypes.isRequired,
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

IngredientDetails.propTypes = {
  card: cardPropTypes.isRequired,
};

export default IngredientDetails;