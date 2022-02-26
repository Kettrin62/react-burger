import React, { useMemo, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { CLEAR_CARDS } from '../../services/actions/constructor';
import totalStyles from './total.module.css';


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

  const [visible, setVisible] = useState(false);
  
  const dispatch = useDispatch();

  const handleOpenModal = async () => {
    setVisible(true);
    const cardsOrder = cards.map(item => item.id).concat(cardBun, cardBun);
    dispatch(getOrder(cardsOrder));
  };
  const handleCloseModal = () => {
    setVisible(false);
    dispatch({
      type: CLEAR_CARDS,
    });
  };

  const modal = (
    <Modal header='' onClose={handleCloseModal}>
      <OrderDetails  />
    </Modal>
  );
  
  return (
    <div style={{overflow: 'hidden'}} className={'pl-4 pr-6 mt-10 ' + totalStyles.total}>
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

export default Total;
