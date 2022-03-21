import { useMemo, useState } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
  getOrder,
  getOrderToken
} from '../../services/actions/order';
import { getCookie } from '../../utils/functions';
import { CLEAR_CARDS } from '../../services/actions/constructor';
import totalStyles from './total.module.css';


const Total = () => {
  const { cards, cardBun } = useSelector(state => state.cards);
  const { ingredients } = useSelector(state => state.ingredients);
  const { isAuthenticated, token } = useSelector(state => state.user);

  const history = useHistory();

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

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      history.replace({ pathname: `/login` });
    } else {
      setVisible(true);
      const cardsOrder = cards.map(item => item.id).concat(cardBun, cardBun);
      if (!token) {
        const refreshToken = getCookie('refreshToken');
        dispatch(getOrderToken(refreshToken, cardsOrder));    
      } else {
        dispatch(getOrder(token, cardsOrder));
      }
    }
  }

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
