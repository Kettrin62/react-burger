import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { cardPropTypes } from '../../utils/data';
import { getIngredients, getCard, CLOSE_MODAL } from '../../services/actions/burger';
import { useDispatch, useSelector } from 'react-redux';



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

const Menu = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }} className='mb-5'>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const IngredientsItem = ({ card }) => {
  const { image, price, name, __v } = card;
  const [visible, setVisible] = React.useState(false);

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
    <div style={{overflow: 'hidden'}}>
      <li className={'ml-3 mr-3 mt-4 mb-4 ' + burgeringredientsStyles.item} onClick={handleOpenModal}>
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
    </div>
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
  
  return (
    <section className={'pl-5 pr-5 ' + burgeringredientsStyles.section}>
      <Title text='Соберите бургер' />
      <Menu />
      <ul className={burgeringredientsStyles.categories}>
        <li>
          <Subtitle text='Булки' />
          <IngredientsList type='bun' />
        </li>
        <li>
          <Subtitle text='Соусы' />
          <IngredientsList type='sauce' />
        </li>
        <li>
          <Subtitle text='Начинки' />
          <IngredientsList type='main' />
        </li>
      </ul>
    </section>
  );
}

export default BurgerIngredients;