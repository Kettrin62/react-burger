import React from 'react';
import PropTypes from 'prop-types';
import ingredientdetailsStyles from './ingredient-details.module.css';
import { cardPropTypes } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';


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

const CaloricContent = () => {
  const { modalCard } = useSelector(state => state.modal);
  const {
    calories,
    proteins,
    fat,
    carbohydrates
  } = modalCard;
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
  // card: cardPropTypes.isRequired,
};

function IngredientDetails() {
  const { modalCard } = useSelector(state => state.modal);
  const { image_large, name } = modalCard;
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
      <CaloricContent />
    </div>
  );
}

IngredientDetails.propTypes = {
  // card: cardPropTypes.isRequired,
};

export default IngredientDetails;