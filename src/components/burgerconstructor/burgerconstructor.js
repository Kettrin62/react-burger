import React from 'react';
import { state } from '../../utils/data';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerconstructorStyles from './burgerconstructor.module.css';




const ConstructorItem = ({ card }) => {
  const { image, price, name, type } = card;
  return (
    <li className={'mb-4 ' + burgerconstructorStyles.item}>
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
  const stateMainSause = stateCount.filter((item) => item.type !== 'bun');

  stateMainSause.forEach((item) => {
    let count = item.__v;
    item.id = item._id + count;
    while (count > 1) {
      {
        stateMainSause.push(item);
        count -= 1;
      }
    }
  })
  console.log(stateMainSause);

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.list}>
      <li className='mb-4'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={stateBun.name + ' (верх)'}
          price={stateBun.price}
          thumbnail={stateBun.image}
        />
      </li>
      {stateMainSause.map((item, index) => (
        <ConstructorItem key={index} card={item} />
      ))}
      <li>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={stateBun.name + ' (низ)'}
          price={stateBun.price}
          thumbnail={stateBun.image}
        />
      </li>
    </ul>
  )
}

const Total = (props) => {
  return (
    <div className={'pl-4 pr-4 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        5656
      </p>
      <CurrencyIcon type="primary" />
      <div className='ml-10'>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}


function BurgerConstructor() {
  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList />
      <Total />
    </section>
  )
}

export default BurgerConstructor;