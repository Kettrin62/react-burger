import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardorderStyles from './card-order.module.css';
import { showMessageDateTime } from '../../utils/functions';



function CardOrder({ card }) {
  const { ingredients } = useSelector(state => state.ingredients);
  // console.log(card)
  const { number, name, ingredients: ingredientsId, createdAt } = card;
  const date = new Date(createdAt);




  const timeZone = date.getTimezoneOffset()/60 < 0 ? `i-GMT+${-date.getTimezoneOffset()/60}` : `i-GMT-${-date.getTimezoneOffset()/60}`;
  const dateTime = `${showMessageDateTime(date)}, ${date.getHours()}:${date.getMinutes()} ${timeZone}`;



  let total = 0;

  const ingredientsCard = ingredientsId.map((item, index) => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    const { image_mobile, price } = ingredient;
    total += price;
    return (
      ingredient &&
      <li key={index} className={cardorderStyles.component}>
        <img src={image_mobile} className={cardorderStyles.image}/>
        <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredientsId.length - 5}`}</span>
      </li>
    )
  });


  return (
    <li className={'mb-4 mr-2 p-6 ' + cardorderStyles.card}>
      <div className={cardorderStyles.header}>
        <p className='text text_type_digits-default'>
          #{number}
        </p>
        <span className='text text_type_main-default text_color_inactive'>
          {dateTime}
        </span>
      </div>
      <h2 className='mb-6 mt-6 text text_type_main-medium'>{name}</h2>
      <div className={cardorderStyles.main}>
        <ul className={cardorderStyles.components}>
          {ingredientsCard}
          {/* {ingredients.map(item => (
            <li key={item.id} className={cardorderStyles.component}>
              <img src={item.image_mobile} className={cardorderStyles.image}/>
              <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredients.length - 5}`}</span>
            </li>
          ))} */}
        </ul>
        <div className={'ml-6 ' + cardorderStyles.price}>
          <p className='text text_type_digits-default'>{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default CardOrder;