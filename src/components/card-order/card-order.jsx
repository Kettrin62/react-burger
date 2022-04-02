import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation} from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardorderStyles from './card-order.module.css';
import { showMessageDateTime } from '../../utils/functions';
import { closeModal, getCard } from '../../services/actions/modal';
import Modal from '../modal/modal';
import CardOrderDetails from '../card-order-details/card-order-details';



function CardOrder({ card }) {
  const { ingredients } = useSelector(state => state.ingredients);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { number, name, ingredients: ingredientsId, createdAt } = card;
  const date = new Date(createdAt);
  const dateTime = showMessageDateTime(date);
  const { pathname } = useLocation();


console.log(card);


  const ingredientsAllCard = ingredientsId.map(item => {
    return ingredients.find(
      (el) => el._id === item
      );
    });


  const total = useMemo(() => {
    return ingredientsAllCard.reduce((acc, item) => acc + item.price, 0)
  }, [ingredientsId]);

  const ingredientsCardResult = ingredientsAllCard.filter(function (item, position, array) {
    return array.lastIndexOf(item) === position;
  });
  
  const ingredientsCard = ingredientsCardResult.map(item => {
    return (
      <li key={item._id} className={cardorderStyles.component}>
        <img src={item.image_mobile} className={cardorderStyles.image}/>
        <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredientsId.length - 5}`}</span>
      </li>
    )
  })

  // const status = () => {
  //   if (card.status === 'done') {
  //     return (
  //       <p>Выполнен</p>
  //     )
  //   } else if (card.status === 'pending') {
  //     return (
  //       <p>Готовится</p>
  //     )
  //   } else if (card.status === 'created') {
  //     return (
  //       <p>Создан</p>
  //     )
  //   }
  // };
  let status;
  let color;
  if (card.status === 'done') {
    status = 'Выполнен';
    color = '#00CCCC';
  } else if (card.status === 'pending') {
    status = 'Готовится'
  } else if (card.status === 'created') {
    status = 'Создан'
  };
  console.log(status);
  




  const handleOpenModal = () => {
    setVisible(true);
    dispatch(getCard(card));
    window.history.pushState({ path: `/feed/:${card._id}` }, '', `/feed/:${card._id}`);
  };
  const handleCloseModal = () => {
    setVisible(false);
    dispatch(closeModal());
    window.history.pushState({ path: '/feed' }, '', '/feed');
  };
  const modal = (
    <Modal header={`#${number}`} onClose={handleCloseModal} type='digits'>
      {/* <CardOrderDetails /> */}
      <CardOrderDetails />
    </Modal>
  )

    const width = pathname === '/profile/orders' ? '788px' : '584px';

  return (
    <>
      <li className={'mb-4 mr-2 p-6 ' + cardorderStyles.card} style={{width}} onClick={handleOpenModal}>
        <div className={cardorderStyles.header}>
          <p className='text text_type_digits-default'>
            #{number}
          </p>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
        </div>
        <h2 className='mt-6 text text_type_main-medium'>{name}</h2>
        {(pathname === '/profile/orders') && (<p className='mt-2 text text_type_main-default' style={{color}}>{status}</p>)}
        <div className={'mt-6 ' + cardorderStyles.main}>
          <ul className={cardorderStyles.components}>
            {ingredientsCard}
            {/* {ingredients.map(item => (
              <li key={item.id} className={cardorderStyles.component}>
                <img src={item.image_mobile} className={cardorderStyles.image}/>
                <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredients.length - 5}`}</span>
              </li>
            ))} */}
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