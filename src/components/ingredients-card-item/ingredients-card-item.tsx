import * as React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientscarditemStyles from './ingredients-card-item.module.css';
import { FC } from 'react';

interface IIngredientsCardItemProps {
  image: string;
  name: string;
  countPrice: string;
};

const IngredientsCardItem: FC<IIngredientsCardItemProps> = ({ image, name, countPrice }) => {

  return (
    <li className={'mt-2 mb-2 mr-6 ' + ingredientscarditemStyles.ingredient}>
      <div className={ingredientscarditemStyles.box}>
        <div className={'mr-4 ' + ingredientscarditemStyles.box__image}>
          <img src={image} className={ingredientscarditemStyles.image} />
        </div>
        <p className='mr-4 text text_type_main-default'>{name}</p>
      </div>
      <div className={ingredientscarditemStyles.price}>
        <p className='text text_type_digits-default pr-2'>{countPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
    </li>
  )
};

export default IngredientsCardItem;