import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerconstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { cardPropTypes } from '../../utils/data';


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
  const ingredients = props.ingredients.filter((item) => item.type !== "bun");

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist}>
      <li className='mb-4 mr-2'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={1255}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </li>
      <li>
        <ul className={burgerconstructorStyles.list}>
          {ingredients.map((item, index) => (
            <ConstructorItem key={index} card={item} />
          ))}
        </ul>
      </li>
      <li className='mt-4 mr-2'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={1255}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </li>
    </ul>
  )
};

ConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

const Total = (props) => {
  const [visible, setVisible] = React.useState(false);
  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };
  const modal = (
    <Modal header='' onClose={handleCloseModal}>
      <OrderDetails  />
    </Modal>
  );
  
  return (
    <div style={{overflow: 'hidden'}} className={'pl-4 pr-6 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        5336
      </p>
      <CurrencyIcon type="primary" />
      <div className='ml-10'>
        <Button type="primary" size="medium" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {visible && modal}
    </div>
  )
};

function BurgerConstructor(props) {
  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList ingredients={props.ingredients} />
      <Total  />
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

export default BurgerConstructor;