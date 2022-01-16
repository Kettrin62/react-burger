import React from 'react';
import PropTypes from 'prop-types';
import { ingredientsData } from '../../utils/data';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerconstructorStyles from './burger-constructor.module.css';

const ingredientsDataConstructor = ingredientsData.filter((item) => item.__v > 0);

const cardPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
});

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

ConstructorItem.propTypes = {
  card: cardPropTypes.isRequired,
};

const ConstructorList = (props) => {
  const ingredientsDataBun = ingredientsDataConstructor.filter((item) => item.type === 'bun')[0];
  const ingredientsDataMainSause = ingredientsDataConstructor.filter((item) => item.type !== 'bun');
  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist}>
      <li className='mb-4'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={ingredientsDataBun.name + ' (верх)'}
          price={ingredientsDataBun.price}
          thumbnail={ingredientsDataBun.image}
        />
      </li>
      <li>
        <ul className={burgerconstructorStyles.list}>
          {ingredientsDataMainSause.map((item, index) => (
            <ConstructorItem key={index} card={item} />
          ))}
        </ul>
      </li>
      
      <li className='mt-4'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={ingredientsDataBun.name + ' (низ)'}
          price={ingredientsDataBun.price}
          thumbnail={ingredientsDataBun.image}
        />
      </li>
    </ul>
  )
};

const Total = (props) => {
  const total = ingredientsDataConstructor.reduce((acc, item) => acc + item.price * item.__v, 0);
  return (
    <div className={'pl-4 pr-4 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        {total}
      </p>
      <CurrencyIcon type="primary" />
      <div className='ml-10'>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
};

function BurgerConstructor() {
  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList />
      <Total />
    </section>
  )
}

export default BurgerConstructor;