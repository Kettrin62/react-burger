import React from 'react';
import { state } from '../../utils/data';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burgeringredients.module.css';

function Title(props) {
  return (
    <h1 className='mb-5 mt-5 pt-5 text text_type_main-large'>
      {props.text}
    </h1>
  )
}


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
  const { image, price, name } = card;
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <p>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p>{name}</p>
    </li>
  )
}

const IngredientsList = (props) => {
  const stateType = state.filter((item) => item.type === props.type);
  return (
    
      <ul className={burgeringredientsStyles.list}>
        {stateType.map((item) => (
          <IngredientsItem key={item._id} card={item} />
        ))}
      </ul>
    
  );
}

function Subtitle(props) {
  return (
    <h2 className='text text_type_main-medium'>
      {props.text}
    </h2>
  )
}


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