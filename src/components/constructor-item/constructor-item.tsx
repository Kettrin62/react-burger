import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from '../../services/hooks';
import { useDrag, useDrop } from "react-dnd";
import { DELETE_CARD } from '../../services/actions/constructor';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructoritemStyles from './constructor-item.module.css';
import { FC } from 'react';
import { TCard } from '../../services/types/data';


interface IConstructorItemProps {
  card: TCard;
  cardKey: string;
  index: number;
  moveCard: (arg0: number, arg1:number) => void;
};

const ConstructorItem: FC<IConstructorItemProps> = ({ card, cardKey, index, moveCard  }) => {
  const { image, price, name } = card;
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

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
    hover: (item: IConstructorItemProps, monitor: any) => {
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
      const hoverBoundingRect = ref.current!.getBoundingClientRect();
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
      {/* <div style={{ opacity }}> */}
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => deleteCard()}
        />
      {/* </div> */}
    </li>
  )
}

export default ConstructorItem;