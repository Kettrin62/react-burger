import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burgeringredients.module.css';

function Title(props) {
  return (
    <p className='mt-5 mb-5 pt-5 text text_type_main-large'>
      {props.text}
    </p>
  )
}

function BurgerIngredients() {
  return (
    <section className='pl-5'>
      <Title text='Соберите бургер' />
    </section>
  );
}

export default BurgerIngredients;