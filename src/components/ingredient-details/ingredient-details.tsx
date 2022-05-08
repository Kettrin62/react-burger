import ingredientdetailsStyles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks';
import CaloricContent from '../caloric-content/caloric-content';


function IngredientDetails() {
  const { modalCard } = useSelector(state => state.modal);
  const image_large = modalCard?.image_large;
  const name = modalCard?.name;
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