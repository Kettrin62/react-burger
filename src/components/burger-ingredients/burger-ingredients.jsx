import React, { useRef } from 'react';
import Title from '../title/title';
import Menu from '../menu/menu';
import IngredientsList from '../ingredients-list/ingredients-list';
import Subtitle from '../subtitle/subtitle';
import burgeringredientsStyles from './burger-ingredients.module.css';
import { CHANGE_TUB } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";

function BurgerIngredients() {
  const bunRef = useRef('bun');
  const sauceRef = useRef('sauce');
  const mainRef = useRef('main');

  const scroll = (item) => {
    item.current.scrollIntoView({ behavior: "smooth" });
  }

  const { tabCurrent } = useSelector(state => state.scroll);

  const dispatch = useDispatch();

  const scrollEvent = (e) => {
    const elementHeight = e.target.scrollTop;
    const bunHeight = bunRef.current.scrollHeight;
    const sauceHeight = sauceRef.current.scrollHeight;
    const mainHeight = mainRef.current.scrollHeight;

    if (bunHeight - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        current: 'one',
      });
    } else if ((bunHeight + sauceHeight) - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        current: 'two',
      });
    } else if ((bunHeight + sauceHeight + mainHeight) - elementHeight > 0) {
      dispatch({
        type: CHANGE_TUB,
        current: 'three',
      });
    }
  }

  const [, drop] = useDrop(() => ({ accept: 'item' }));

  return (
    <section className={'pl-5 pr-5 ' + burgeringredientsStyles.section} ref={drop}>
      <Title text='Соберите бургер' />
      <Menu 
        current = {tabCurrent}
        bunScroll = {() => scroll(bunRef)}
        sauceScroll = {() => scroll(sauceRef)}
        mainScroll = {() => scroll(mainRef)} 
      />
      <ul className={burgeringredientsStyles.categories} onScroll={scrollEvent}>
        <li ref={bunRef}>
          <Subtitle text='Булки' />
          <IngredientsList type='bun' />
        </li>
        <li ref={sauceRef}>
          <Subtitle text='Соусы' />
          <IngredientsList type='sauce' />
        </li>
        <li ref={mainRef}>
          <Subtitle text='Начинки' />
          <IngredientsList type='main' />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;