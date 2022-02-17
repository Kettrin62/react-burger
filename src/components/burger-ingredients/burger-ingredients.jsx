import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { cardPropTypes } from '../../utils/data';
import { getIngredients, getCard, CLOSE_MODAL, CHANGE_TUB } from '../../services/actions/burger';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";



function Title(props) {
  return (
    <h1 className='mb-5 mt-5 pt-5 text text_type_main-large'>
      {props.text}
    </h1>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

const Menu = (props) => {
  return (
    <div style={{ display: 'flex' }} className='mb-5'>
      <Tab value='one' active={props.current === 'one'} onClick={() => props.bunScroll()}>
        Булки
      </Tab>
      <Tab value='two' active={props.current === 'two'} onClick={() => props.sauceScroll()}>
        Соусы
      </Tab>
      <Tab value='three' active={props.current === 'three'} onClick={() => props.mainScroll()}>
        Начинки
      </Tab>
    </div>
  )
}

Menu.propTypes = {
  bunScroll: PropTypes.func.isRequired,
  sauceScroll: PropTypes.func.isRequired,
  mainScroll: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
};

const IngredientsItem = ({ card }) => {
  
  const { image, price, name, __v, _id: id, type } = card;
  const [visible, setVisible] = React.useState(false);

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });
  

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setVisible(true);
    dispatch(getCard(card));
  };
  const handleCloseModal = () => {
    setVisible(false);
    dispatch({
      type: CLOSE_MODAL,
    });
  };
  const modal = (
    <Modal header='Детали ингредиента' onClose={handleCloseModal}>
      <IngredientDetails />
    </Modal>
  );

  return (
    <>
      <li
        className={'ml-3 mr-3 mt-4 mb-4 ' + burgeringredientsStyles.item}
        onClick={handleOpenModal}
        style={{opacity}}
        ref={dragRef}
      >
        <img src={image} alt={name} />
        <div className={'pt-1 pb-1 ' + burgeringredientsStyles.price}>
          <p className='text text_type_digits-default pr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p style={{ textAlign: 'center' }} className='text text_type_main-default'>{name}</p>
        {(__v > 0) && (
          <Counter count={__v} size="default" />
        )}
      </li>
      {visible && modal}
    </>
  )
}

IngredientsItem.propTypes = {
  card: cardPropTypes.isRequired,
};

const IngredientsList = ({ type }) => {

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  const ingredientsType = ingredients.filter((item) => item.type === type);

  if (ingredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (ingredientsRequest) {
    return <p>Загрузка...</p>
  } else {
    return (
      <ul className={'pt-2 pb-1 pl-1 pr-1 ' + burgeringredientsStyles.list}>
        {ingredientsType.map((item) => (
          <IngredientsItem key={item._id} card={item} />
          ))}
      </ul>
    );
  }
}

IngredientsList.propTypes = {
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
};

function Subtitle({ text }) {
  return (
    <h2 className='mt-5 mb-3 text text_type_main-medium'>
      {text}
    </h2>
  )
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
};

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

  return (
    <section className={'pl-5 pr-5 ' + burgeringredientsStyles.section}>
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