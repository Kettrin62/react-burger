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
import { useDrag, useDrop } from "react-dnd";
import { ADD_CARD, CHANGE_CARD_BUN, CLEAR_CARDS, DELETE_CARD, SORT_CARD } from '../../services/actions/constructor';
import { v4 as uuidv4 } from 'uuid';


const ConstructorItem = ({ card, cardKey, index, moveCard  }) => {
  const { image, price, name, type } = card;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const deleteCard = () => {
    dispatch({
      type: DELETE_CARD,
      key: cardKey
    })
  };

  const [{ opacity }, dragRef] = useDrag({
    type: 'item',
    item: { card, index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.1 : 1,
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'item',
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: item => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
    },
  });

  dragRef(dropRef(ref));

  return (
    <li
      className={'mb-4 ' + burgerconstructorStyles.item}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteCard()}
        style={{ opacity }}
        />
    </li>
  )
}

ConstructorItem.propTypes = {
  card: cardPropTypes.isRequired,
  cardKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
};

const ConstructorList = () => {
  const { ingredients } = useSelector(state => state.ingredients);
  const { cards, cardBun } = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const ingredientsBun = ingredients.filter(item => item._id === cardBun);

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type !== 'bun') {
        dispatch({
          type: ADD_CARD,
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

    const moveCard = (dragIndex, hoverIndex) => {
      const changedCards = cards.slice();
      changedCards.splice(dragIndex, 1);
      changedCards.splice(hoverIndex, 0, cards[dragIndex]);
      dispatch({
        type: SORT_CARD,
        cards: changedCards,
      });
    };

    const ingredientsNotBun = cards.map((item, index) => {
      const ingredient = ingredients.find(
        (el) => el.type !== 'bun' && el._id === item.id
      );
      return (
        ingredient &&
        <ConstructorItem
          key={item.key}
          card={ingredient}
          cardKey={item.key}
          moveCard={moveCard}
          index={index}
        />
      )
    });

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist} ref={dropTarget} style={{border}}>
      <li className='mb-4 mr-2'>
        {ingredientsBun.map((item) => (
          <ConstructorElement
            key={item._id}
            type='top'
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
        </ul>
      </li>
      <li className='mt-4 mr-2'>
        {ingredientsBun.map((item) => (
          <ConstructorElement
            key={item._id}
            type='bottom'
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
