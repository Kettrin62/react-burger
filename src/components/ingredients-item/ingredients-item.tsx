import * as React from 'react';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrag } from "react-dnd";
import { getCard, CLOSE_MODAL } from '../../services/actions/modal';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsitemStyles from './ingredients-item.module.css';
import { FC } from 'react';
import { TCard } from '../../services/types/data';


interface IIngredientsItemProps {
  card: TCard;
};

const IngredientsItem: FC<IIngredientsItemProps> = ({ card }) => {
  const { image, price, name, _id: id, type } = card;
  const { cards, cardBun } = useSelector(state => state.cards);
  const { ingredients } = useSelector(state => state.ingredients);
  const [visible, setVisible] = useState(false);

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });

  const counter = useMemo(() => {
    if (card.type !== 'bun') {
      return (cards.filter((item) => item.id === card._id).length)
    } else {
      return (cardBun === card._id ? 2 : 0)
    }
  }, [ingredients, cards, cardBun]
  );

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setVisible(true);
    dispatch(getCard(card));
    window.history.pushState({ path: `/ingredients/:${card._id}` }, '', `/ingredients/:${card._id}`);
  };
  const handleCloseModal = () => {
    setVisible(false);
    dispatch({
      type: CLOSE_MODAL,
    });
    window.history.pushState({ path: '/' }, '', '/');
  };
  const modal = (
    <Modal header='Детали ингредиента' onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  );

  return (
    <>
      <li
        className={'ml-3 mr-3 mt-4 mb-4 ' + ingredientsitemStyles.item}
        onClick={handleOpenModal}
        style={{opacity}}
        ref={dragRef}
      >
        <img src={image} alt={name} />
        <div className={'pt-1 pb-1 ' + ingredientsitemStyles.price}>
          <p className='text text_type_digits-default pr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p style={{ textAlign: 'center' }} className='text text_type_main-default'>
          {name}
        </p>
        {(counter > 0) && (
          <Counter count={counter} size="default" />
        )}
      </li>
      {visible && modal}
    </>
  )
}

export default IngredientsItem;