import React from 'react';
import { state } from '../../utils/data';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerconstructorStyles from './burgerconstructor.module.css';




const ConstructorItem = ({ card }) => {
  const { image, price, name, __v, type } = card;
  const count = card.__v;
  return (
    <li>
      {(type !== 'bun') ? (
        <DragIcon type="primary" />
      ) : null}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
}

const ConstructorList = (props) => {
  const stateCount = state.filter((item) => item.__v > 0);
  const stateBun = stateCount.filter((item) => item.type === 'bun')[0];
  return (
    <ul className={burgerconstructorStyles.list}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={stateBun.name + ' (верх)'}
        price={stateBun.price}
        thumbnail={stateBun.image}
      />
      {stateCount.map((item) => (
        <ConstructorItem key={item._id} card={item} />
      ))}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={stateBun.name + ' (низ)'}
        price={stateBun.price}
        thumbnail={stateBun.image}
      />
    </ul>
  )
}


function BurgerConstructor() {
  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList />
    </section>
  )
}

export default BurgerConstructor;