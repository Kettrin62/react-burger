import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerconstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { cardPropTypes } from '../../utils/data';
import { IngredientsContext } from '../../services/ingredients-context';
import { ConstructorContext } from '../../services/constructor-context';



const ConstructorItem = ({ card }) => {
  const { image, price, name, type } = card;
  return (
    <li className={'mb-4 ' + burgerconstructorStyles.item}>
      {(type !== 'bun') ? (
        <DragIcon type="primary" />
      ) : null}
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
      />
    </li>
  )
}

ConstructorItem.propTypes = {
  card: cardPropTypes.isRequired,
};



const ConstructorList = ({ ingredients, cards }) => {

  const dataConstructor = ingredients.filter(item =>
    cards.find(element => element === item._id)
  );
  const ingredientsBun = dataConstructor.filter(item => item.type === "bun");
  const ingredientsNotBun = dataConstructor.filter(item => item.type !== "bun");

  // const ingredientsNotBun = ingredients.filter((item) => item.type !== 'bun');

  return (
    <ul className={'pl-4 pr-4 ' + burgerconstructorStyles.constructorlist}>
      <li className='mb-4 mr-2'>
        {ingredientsBun.map((item, index) => (
          <ConstructorElement
            key={item._id}
            type="top"
            isLocked={true}
            text={item.name + ' (верх)'}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </li>
      <li>
        <ul className={burgerconstructorStyles.list}>
          {ingredientsNotBun.map((item, index) => (
            <ConstructorItem key={index} card={item} />
          ))}
        </ul>
      </li>
      <li className='mt-4 mr-2'>
        {ingredientsBun.map((item, index) => (
          <ConstructorElement
            key={item._id}
            type="top"
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

ConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
};

const Total = (props) => {
  const [visible, setVisible] = React.useState(false);
  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };
  const modal = (
    <Modal header='' onClose={handleCloseModal}>
      <OrderDetails  />
    </Modal>
  );
  
  return (
    <div style={{overflow: 'hidden'}} className={'pl-4 pr-6 mt-10 ' + burgerconstructorStyles.total}>
      <p className='text text_type_digits-medium mr-2'>
        5336
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
  const ingredients = React.useContext(IngredientsContext);

  const [card, setCard] = React.useState([
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733c8',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733ca',
    '60d3b41abdacab0026a733cb',
  ]);

  return (
    <ConstructorContext.Provider value={card}>
      <section className={'pl-5 pr-5 pt-25 ' + burgerconstructorStyles.section}>
        <ConstructorList ingredients={ingredients} cards={card} />
        <Total  />
      </section>
    </ConstructorContext.Provider>
  )
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(cardPropTypes).isRequired,
// };

export default BurgerConstructor;

