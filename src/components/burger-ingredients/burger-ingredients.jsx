import React from 'react';
import PropTypes from 'prop-types';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burger-ingredients.module.css';

const cardPropTypes = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
});

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
  return (
    <li className={'ml-3 mr-3 mt-4 mb-4 ' + burgeringredientsStyles.item}>
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
  )
}

IngredientsItem.propTypes = {
  card: cardPropTypes.isRequired,
};

const IngredientsList = ({ type, ingredients }) => {
  const ingredientsType = ingredients.filter((item) => item.type === type);
  return (
      <ul className={'pt-2 pb-1 pl-1 pr-1 ' + burgeringredientsStyles.list}>
        {ingredientsType.map((item) => (
          <IngredientsItem key={item._id} card={item} />
        ))}
      </ul>
  );
}

function Subtitle(props) {
  return (
    <h2 className='mt-5 mb-3 text text_type_main-medium'>
      {props.text}
    </h2>
  )
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
};

function BurgerIngredients(props) {
  return (
    <section className={'pl-5 pr-5 ' + burgeringredientsStyles.section}>
      <Title text='Соберите бургер' />
      <Menu />
      <ul className={burgeringredientsStyles.categories}>
        <li>
          <Subtitle text='Булки' />
          <IngredientsList type='bun' ingredients={props.ingredients}/>
        </li>
        <li>
          <Subtitle text='Соусы' />
          <IngredientsList type='sauce' ingredients={props.ingredients} />
        </li>
        <li>
          <Subtitle text='Начинки' />
          <IngredientsList type='main' ingredients={props.ingredients} />
        </li>
        
      </ul>
    </section>
  );
}

export default BurgerIngredients;