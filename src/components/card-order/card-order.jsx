import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardorderStyles from './card-order.module.css';



function CardOrder({ card }) {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
  // console.log(card)
  const { number, name, ingredients: ingredientsId, createdAt: date } = card;
  // console.log(ingredients);
  // console.log(ingredientsId);
  console.log(date);
  const dateString = new Date(date).toLocaleDateString();
  console.log(dateString);
  console.log(new Date(date).toTimeString());
  console.log(new Date(date).toUTCString());
  console.log(new Date(date).toLocaleTimeString());

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
  };
  console.log(new Date(date).toLocaleDateString("ru", options));



  // var d = new Date();
  // console.log('сегодня', d.getDate());
  // d.setDate(d.getDate() - 1);
  // console.log('вчера', d.getDate())

  function dtime_nums(e) {
    var n = new Date;
    n.setDate(n.getDate() + e);
    return n.toLocaleDateString();
  }
  
  // console.log(dtime_nums(-1));



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
          Сегодня, 16:20 i-GMT+3
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