import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardorderStyles from './card-order.module.css';



function CardOrder() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);


  return (
    <li className={'mb-4 mr-2 p-6 ' + cardorderStyles.card}>
      <div className={cardorderStyles.header}>
        <p className='text text_type_digits-default'>
          #034535
        </p>
        <span className='text text_type_main-default text_color_inactive'>
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <h2 className='mb-6 mt-6 text text_type_main-medium'>Death Star Starship Main бургер</h2>
      <div className={cardorderStyles.main}>
        <ul className={cardorderStyles.components}>
          {ingredients.map(item => (
            <li key={item.id} className={cardorderStyles.component}>
              <img src={item.image_mobile} className={cardorderStyles.image}/>
              <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredients.length - 5}`}</span>
            </li>
          ))}
        </ul>
        <div className={'ml-6 ' + cardorderStyles.price}>
          <p className='text text_type_digits-default'>480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}

export default CardOrder;