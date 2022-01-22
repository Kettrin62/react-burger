import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerconstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientsData } from '../../utils/data';

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
  // const ingredientsBun = props.ingredients.filter((item) => item.type === 'bun')[0];
  // const ingredientsMainSause = props.ingredients.filter((item) => item.type !== 'bun');
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

// ConstructorList.propTypes = {
//   ingredients: PropTypes.array.isRequired,
// };

const Total = (props) => {
  // const total = props.ingredients.reduce((acc, item) => acc + item.price, 0);
  const total = ingredientsDataConstructor.reduce((acc, item) => acc + item.price * item.__v, 0);
  const [visible, setVisible] = React.useState(false);
  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };
  const modal = (
    <Modal header='' onClick={handleCloseModal}>
      <OrderDetails  />
    </Modal>
  );
  
  return (
    <div style={{overflow: 'hidden'}} className={'pl-4 pr-4 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        {total}
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

// Total.propTypes = {
//   ingredients: PropTypes.array.isRequired,
// };

function BurgerConstructor(props) {
  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList ingredients={props.ingredients} />
      <Total  />
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;