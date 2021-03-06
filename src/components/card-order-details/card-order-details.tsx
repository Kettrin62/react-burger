import * as React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { showMessageDateTime } from '../../utils/functions';
import IngredientsCardItem from '../ingredients-card-item/ingredients-card-item';
import cardorderdetailsStyles from './card-order-details.module.css';

function CardOrderDetails() {
  const { ingredients } = useSelector(state => state.ingredients);
  const { modalCardOrder } = useSelector(state => state.modal);
  const { name, ingredients: ingredientsId, createdAt } = modalCardOrder!;

  const date = new Date(createdAt);
  const dateTime = showMessageDateTime(date);

  interface IObj {
    id: string;
    name: string;
    image: string;
    count: number;
    price: number;
  }

  interface IIngredientsCardObj {
    [name: string]: IObj; 
  }

  const ingredientsCardObj: IIngredientsCardObj = {};
  ingredientsId.forEach(item => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    if (ingredient !== undefined) {
      item in ingredientsCardObj ? 
      ingredientsCardObj[item].count += 1 : 
      ingredientsCardObj[item] = {
        id: ingredient._id,
        name: ingredient.name,
        image: ingredient.image_mobile,
        count: 1,
        price: ingredient.price
      };
    }
  });

  const ingredientsCardArr = Object.values(ingredientsCardObj);
  
  let total = 0;

  const ingredientsCardOrder = ingredientsCardArr.map(item => {
    const { id, image, name, count, price } = item;
    total += count * price;
    const countPrice = `${count} x ${price}`
    return (
      <IngredientsCardItem 
        key={id}
        image={image}
        name={name}
        countPrice={countPrice}
      />
    )
  });

  const status = modalCardOrder!.status === 'done' ? 'Выполнен' : 'Готовится';

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