import * as React from 'react';
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useLocation} from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardorderStyles from './card-order.module.css';
import { showMessageDateTime } from '../../utils/functions';
import { closeModal, getCardOrder } from '../../services/actions/modal';
import Modal from '../modal/modal';
import CardOrderDetails from '../card-order-details/card-order-details';
import { FC } from 'react';
import { TCardOrder } from '../../services/types/data';


interface ICardOrderProps {
  card: TCardOrder;
}

const CardOrder: FC<ICardOrderProps> = ({ card }) => {
  const { ingredients } = useSelector(state => state.ingredients);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { number, name, ingredients: ingredientsId, createdAt } = card;
  const date = new Date(createdAt);
  const dateTime = showMessageDateTime(date);
  const { pathname } = useLocation();

  const ingredientsAllCard = ingredientsId.map(item => {
    return ingredients.find(
      (el) => el._id === item
    );
  });

  const total = useMemo(() => {
    return ingredientsAllCard.reduce((acc, item) => acc + item!.price, 0)
  }, [ingredientsId]);

  const ingredientsCardResult = ingredientsAllCard.filter(function (item, position, array) {
    return array.lastIndexOf(item) === position;
  });

  const ingredientsCard = ingredientsCardResult.map(item => {
    return (
      <li key={item!._id} className={cardorderStyles.component}>
        <img src={item!.image_mobile} className={cardorderStyles.image}/>
        <span className={'text text_type_main-default ' + cardorderStyles.span}>
          {`+${ingredientsId.length - 5}`}
        </span>
      </li>
    )
  })

  let status;
  let color;
  switch (card.status) {
    case 'done':
      status = 'Выполнен';
      color = '#00CCCC';
      break;
    case 'pending':
      status = 'Готовится';
      break;
    case 'created':
      status = 'Создан';
      break;
  }

  const handleOpenModal = () => {
    setVisible(true);
    dispatch(getCardOrder(card));
    pathname === '/feed' ? 
    window.history.pushState({ path: `/feed/:${card._id}` }, '', `/feed/:${card._id}`) :
    window.history.pushState(
      { path: `/profile/orders/:${card._id}` }, 
      '', 
      `/profile/orders/:${card._id}`
    );
  };
  const handleCloseModal = () => {
    setVisible(false);
    dispatch(closeModal());
    pathname === '/feed' ? 
    window.history.pushState({ path: '/feed' }, '', '/feed') :
    window.history.pushState({ path: `/profile/orders` }, '', `/profile/orders`);
  };
  const modal = (
    <Modal header={`#${number}`} onClose={handleCloseModal} type='digits'>
      <CardOrderDetails />
    </Modal>
  )

    const width = pathname === '/profile/orders' ? '796px' : '536px';

  return (
    <>
      <li
        className={'mb-4 p-6 ' + cardorderStyles.card}
        style={{width}}
        onClick={handleOpenModal}
      >
        <div className={cardorderStyles.header}>
          <p className='text text_type_digits-default'>
            {`#${number}`}
          </p>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
        </div>
        <h2 className='mt-6 text text_type_main-medium'>{name}</h2>
        {(pathname === '/profile/orders') && 
        (<p className='mt-2 text text_type_main-default' style={{color}}>{status}</p>)}
        <div className={'mt-6 ' + cardorderStyles.main}>
          <ul className={cardorderStyles.components}>
            {ingredientsCard}
          </ul>
          <div className={'ml-6 ' + cardorderStyles.price}>
            <p className='text text_type_digits-default'>{total}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
      {visible && modal}
    </>
  );
}

export default CardOrder;