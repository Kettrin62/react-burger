import ingredientdetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import CaloricContent from '../caloric-content/caloric-content';


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

export default IngredientDetails;