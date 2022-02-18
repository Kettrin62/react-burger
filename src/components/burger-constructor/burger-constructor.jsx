import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerconstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { cardPropTypes } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { useDrop } from "react-dnd";
import { ADD_CARD, CHANGE_CARD_BUN, DELETE_CARD } from '../../services/actions/constructor';
import { v4 as uuidv4 } from 'uuid';


const ConstructorItem = ({ card, cardKey }) => {
  const { image, price, name, type } = card;
  const dispatch = useDispatch();

  const deleteCard = () => {
    console.log(cardKey);
    dispatch({
      type: DELETE_CARD,
      key: cardKey
    })
  };

  return (
    <li className={'mb-4 ' + burgerconstructorStyles.item}>
      {(type !== 'bun') ? (
        <DragIcon type="primary" />
        ) : null}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteCard()}
        />
    </li>
  )
}

ConstructorItem.propTypes = {
  card: cardPropTypes.isRequired,
};

const ConstructorList = () => {

  const { ingredients } = useSelector(state => state.ingredients);
  const { cards, cardBun } = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const ingredientsBun = ingredients.filter(item => item._id === cardBun);
  
  const ingredientsNotBun = cards.map((item) => {
    const ingredient = ingredients.find(
      (el) => el.type !== 'bun' && el._id === item.id
    );
    return (
      ingredient &&
      <ConstructorItem
        key={item.key}
        card={ingredient}
        cardKey={item.key}
      />
    )
  });

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type !== 'bun') {
        dispatch({
          type: ADD_CARD,
          // ...item,
          id: item.id,
          key: uuidv4()
        })
      } else {
        dispatch({
          type: CHANGE_CARD_BUN,
          id: item.id,
      })}
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });
  
  const border = isHover ? '1px solid #2f2f37' : 'transparent';

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist} ref={dropTarget} style={{border}}>
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
        <ul className={burgerconstructorStyles.list} >
          {ingredientsNotBun}
          {/* {ingredientsNotBun.map((item, key) => (
            <ConstructorItem key={key} card={item} />
          ))}  */}
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
  const { cards, cardBun } = useSelector(state => state.cards);
  const { ingredients } = useSelector(state => state.ingredients);

  const totalPrice = useMemo(() => {
    let total = 0;
      const element = ingredients.find(el => el._id === cardBun);
      if (element) {
        total += element.price * 2;
      };
    cards.forEach((item) => {
      const element = ingredients.find(el => el._id === item.id);
      if (element) {
        total += element.price;
      }
    });
    return total;
  }, [cards, ingredients, cardBun]);

  const [visible, setVisible] = React.useState(false);
  
  const dispatch = useDispatch();

  const handleOpenModal = async () => {
    setVisible(true);
    dispatch(getOrder(cards));
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
        {totalPrice}
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

function BurgerConstructor() {

  return (
    <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
      <ConstructorList />
      <Total />
    </section>
  )
}

export default BurgerConstructor;
