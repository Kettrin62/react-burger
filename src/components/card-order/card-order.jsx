import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cardorderStyles from './card-order.module.css';
import { showMessageDateTime } from '../../utils/functions';
import { closeModal, getCard } from '../../services/actions/modal';
import Modal from '../modal/modal';
import CardOrderDetails from '../card-order-details/card-order.details';



function CardOrder({ card }) {
  const { ingredients } = useSelector(state => state.ingredients);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();


  // console.log(card)
  const { number, name, ingredients: ingredientsId, createdAt } = card;
  const date = new Date(createdAt);



  // const dateMins = ('0'+ date.getMinutes()).slice(-2);
  // const timeZone = date.getTimezoneOffset()/60 < 0 ? `i-GMT+${-date.getTimezoneOffset()/60}` : `i-GMT-${-date.getTimezoneOffset()/60}`;
  // const dateTime = `${showMessageDateTime(date)}, ${date.getHours()}:${dateMins} ${timeZone}`;

  const dateTime = showMessageDateTime(date);

  // let total = 0;

  // const ingredientsCard = ingredientsId.map((item, index) => {
  //   const ingredient = ingredients.find(
  //     (el) => el._id === item
  //   );
  //   const { image_mobile, price } = ingredient;
  //   total += price;
  //   return (
  //     ingredient &&
  //     <li key={index} className={cardorderStyles.component}>
  //       <img src={image_mobile} className={cardorderStyles.image}/>
  //       <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredientsId.length - 5}`}</span>
  //     </li>
  //   )
  // });
  
  



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
  // console.log(ingredientsCardResult);
  const ingredientsCard = ingredientsCardResult.map(item => {
    // console.log(item);
    return (
      <li key={item._id} className={cardorderStyles.component}>
        <img src={item.image_mobile} className={cardorderStyles.image}/>
        <span className={'text text_type_main-default ' + cardorderStyles.span}>{`+${ingredientsId.length - 5}`}</span>
      </li>
    )
  })





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
      <CardOrderDetails />
    </Modal>
  )


  return (
    <>
      <li className={'mb-4 mr-2 p-6 ' + cardorderStyles.card} onClick={handleOpenModal}>
        <div className={cardorderStyles.header}>
          <p className='text text_type_digits-default'>
            #{number}
          </p>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
        </div>
        <h2 className='mb-6 mt-6 text text_type_main-medium'>{name}</h2>
        <div className={cardorderStyles.main}>
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