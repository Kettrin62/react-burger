import React from 'react';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgeringredientsStyles from './burgeringredients.module.css';

function Title(props) {
  return (
    <p className='mb-5 pt-5 text text_type_main-large'>
      {props.text}
    </p>
  )
}


const Menu = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
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





function BurgerIngredients() {
  return (
    <section className={'pl-5 pr-5 ' + burgeringredientsStyles.section}>
      <Title text='Соберите бургер' />
      <Menu />

    </section>
  );
}

export default BurgerIngredients;