import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { DELETE_CARD } from '../../services/actions/constructor';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { cardPropTypes } from '../../utils/data';
import constructoritemStyles from './constructor-item.module.css';


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
      className={'mb-4 ' + constructoritemStyles.item}
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

export default ConstructorItem;