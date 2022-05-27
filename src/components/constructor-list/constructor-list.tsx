import * as React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrop } from "react-dnd";
import { ADD_CARD, CHANGE_CARD_BUN, SORT_CARD } from '../../services/actions/constructor';
import { v4 as uuidv4 } from 'uuid';
import ConstructorItem from '../constructor-item/constructor-item';
import constructorlistStyles from './constructor-list.module.css';
import { TType } from '../../services/types/data';

interface IItem {
  readonly type: TType;
  readonly id: string;
}

const ConstructorList = () => {
  const { ingredients } = useSelector(state => state.ingredients);
  const { cards, cardBun } = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const ingredientsBun = ingredients.filter(item => item._id === cardBun);

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IItem) {
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

    const moveCard = (dragIndex: number, hoverIndex: number) => {
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
        el => el.type !== 'bun' && el._id === item.id
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
    <ul 
      className={'pl-4 pr-4 ' + constructorlistStyles.constructorlist} 
      ref={dropTarget} 
      style={{border}}
    >
      <li className='mb-4 mr-2'>
        {ingredientsBun.map(item => (
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
        <ul className={constructorlistStyles.list} >
          {ingredientsNotBun}
        </ul>
      </li>
      <li className='mt-4 mr-2'>
        {ingredientsBun.map(item => (
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

export default ConstructorList;