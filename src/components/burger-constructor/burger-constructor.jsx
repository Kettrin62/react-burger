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
import { TotalPriceContext, OrderContext } from '../../services/burger-constructor-context';
import { BASEURL } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';


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

const ConstructorList = () => {

  const { ingredients } = useSelector(state => state.ingredients);
  const { cards } = useSelector(state => state.cards);
  const dispatch = useDispatch();


  const { totalDispatcher } = React.useContext(TotalPriceContext);
  
  const dataConstructor = ingredients.filter(item =>
    cards.find(element => element === item._id)
    );
  const ingredientsBun = dataConstructor.filter(item => item.type === "bun");
  const ingredientsNotBun = dataConstructor.filter(item => item.type !== "bun");

  React.useEffect(() => {
    totalDispatcher({ arrayBun: ingredientsBun, arrayNotBun: ingredientsNotBun })
  }, [cards, ingredients]);

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist}>
      <li className='mb-4 mr-2'>
        {ingredientsBun.map((item) => (
          <ConstructorElement
            key={item._id}
            type="top"
            isLocked={true}
            text={item.name + ' (верх)'}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </li>
      <li>
        <ul className={burgerconstructorStyles.list}>
          {ingredientsNotBun.map((item, index) => (
            <ConstructorItem key={index} card={item} />
          ))}
        </ul>
      </li>
      <li className='mt-4 mr-2'>
        {ingredientsBun.map((item) => (
          <ConstructorElement
            key={item._id}
            type="top"
            isLocked={true}
            text={item.name + ' (низ)'}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </li>
    </ul>
  )
};

const Total = () => {
  const { cards } = useSelector(state => state.cards);
  const { totalPrice } = React.useContext(TotalPriceContext);

  const [visible, setVisible] = React.useState(false);
  const [order, setOrder] = React.useState(null);

  const getOrder = () => {
    fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: cards
      })
    })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.statusText}`);
    })
    .then((data) => {
      setOrder(data.order.number)
    })
    .catch((err) => console.log(err));
  };

  const handleOpenModal = () => {
    setVisible(true);
    getOrder();
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  const modal = (
    <Modal header='' onClose={handleCloseModal}>
      <OrderContext.Provider value={order}>
        <OrderDetails  />
      </OrderContext.Provider>
    </Modal>
  );
  
  return (
    <div style={{overflow: 'hidden'}} className={'pl-4 pr-6 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        {totalPrice.price}
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


const totalInitialPrice = { price: 0 };

function reducer(_totalPrice, action) {
  const total = 
    action.arrayNotBun.reduce((acc, item) => acc + item.price, 0) + 
    action.arrayBun.reduce((acc, item) => acc + item.price * 2, 0);
  return { price: total };
}

function BurgerConstructor() {
  const [totalPrice, totalDispatcher] = React.useReducer(reducer, totalInitialPrice);

  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <TotalPriceContext.Provider value={{ totalPrice, totalDispatcher }}>
        <ConstructorList />
        <Total />
      </TotalPriceContext.Provider>
    </section>
  )
}

export default BurgerConstructor;
