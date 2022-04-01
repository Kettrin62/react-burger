import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { showMessageDateTime } from '../../utils/functions';
import IngredientsCardItem from '../ingredients-card-item/ingredients-card-item';
import cardorderdetailsStyles from './card-order-details.module.css';

function CardOrderDetails() {
  const { ingredients } = useSelector(state => state.ingredients);
  const { modalCard } = useSelector(state => state.modal);
  console.log(modalCard);
  const { name, ingredients: ingredientsId, createdAt } = modalCard;
  const date = new Date(createdAt);
  const dateTime = showMessageDateTime(date);

  // const ingredientsAllCard = ingredientsId.map(item => {
  //   return ingredients.find(
  //     (el) => el._id === item
  //     );
  //   });
  // const total = ingredientsAllCard.reduce((acc, item) => acc + item.price, 0);
  // console.log(ingredientsAllCard);



  const ingredientsCardObj = {}
  ingredientsId.forEach(item => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    item in ingredientsCardObj ? ingredientsCardObj[item].count += 1 : ingredientsCardObj[item] = {
      id: ingredient._id,
      name: ingredient.name,
      image: ingredient.image_mobile,
      count: 1,
      price: ingredient.price
    };
  });

  const ingredientsCardArr = Object.values(ingredientsCardObj);
  
  let total = 0;

  const ingredientsCardOrder = ingredientsCardArr.map(item => {
    const { id, image, name, count, price } = item;
    total += count * price;
    console.log(item);
    const countPrice = `${count} x ${price}`
    return (
      // <li key={id} className={'mt-2 mb-2 mr-6 ' + cardorderdetailsStyles.ingredient}>
      //   <div className={cardorderdetailsStyles.box}>
      //     <div className={'mr-4 ' + cardorderdetailsStyles.box__image}>
      //       <img src={image} className={cardorderdetailsStyles.image} />
      //     </div>
      //     <p className='mr-4 text text_type_main-default'>{name}</p>
      //   </div>
      //   <div className={cardorderdetailsStyles.price}>
      //     <p className='text text_type_digits-default pr-2'>{countPrice}</p>
      //     <CurrencyIcon type='primary' />
      //   </div>
      // </li>
      <IngredientsCardItem 
        key={id}
        image={image}
        name={name}
        countPrice={countPrice}
      />
    )
  });


  console.log(total);


  const status = modalCard.status === 'done' ? 'Выполнен' : 'Готовится';

  return (
    <div className={cardorderdetailsStyles.container}>
      <h3 className='mt-10 mb-3 text text_type_main-medium'>
        {name}
      </h3>
      <p className={'text text_type_main-default ' + cardorderdetailsStyles.text}>
        {status}
      </p>
      <h4 className='mt-15 mb-4 text text_type_main-medium'>
        Состав:
      </h4>
      <ul className={cardorderdetailsStyles.ingredients}>
        {ingredientsCardOrder}
      </ul>
      <div className={'mt-10 ' + cardorderdetailsStyles.total}>
        <span className='text text_type_main-default text_color_inactive'>
          {dateTime}
        </span>
        <div className={cardorderdetailsStyles.price}>
          <p className='text text_type_digits-default pr-2'>{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )

}

export default CardOrderDetails;