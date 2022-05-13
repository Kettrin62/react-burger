import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { useParams, useRouteMatch } from 'react-router-dom';
import IngredientsCardItem from '../components/ingredients-card-item/ingredients-card-item';
import { 
  WS_CONNECTION_FINISH, 
  WS_CONNECTION_START, 
  WS_CONNECTION_START_INIT 
} from '../services/actions/ws';
import { showMessageDateTime } from '../utils/functions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderinfoStyles from './order-info.module.css';


export function OrderInfoPage() {
  const { ingredients } = useSelector(state => state.ingredients);
  const { orders, ordersUser } = useSelector(state => state.ws);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const id = useParams<{ id?: string }>().id!.slice(1);

  useEffect(() => {
    if (match.path === '/profile/orders/:id') {
      dispatch({ type: WS_CONNECTION_START_INIT });
      return () => {
        dispatch({ type: WS_CONNECTION_FINISH });
      };
    } else {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_FINISH });
      };
    }
  }, []);

  const order = 
    match.path === '/profile/orders/:id' ? 
    ordersUser!.find(({ _id }) => _id === id) : 
    orders!.find(({ _id }) => _id === id);

  const date = new Date(order!.createdAt);
  const dateTime = showMessageDateTime(date);

  interface IObj {
    id: string;
    name: string;
    image: string;
    count: number;
    price: number;
  }

  interface IIngredientsCardObj {
    [name: string]: IObj; 
  }

  const ingredientsCardObj: IIngredientsCardObj = {};

  order!.ingredients.forEach(item => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    if (ingredient !== undefined) {
      item in ingredientsCardObj ? ingredientsCardObj[item].count += 1 : ingredientsCardObj[item] = {
        id: ingredient._id,
        name: ingredient.name,
        image: ingredient.image_mobile,
        count: 1,
        price: ingredient.price
      };
    }
  });

  const ingredientsCardArr = Object.values(ingredientsCardObj);
  
  let total: number = 0;

  const ingredientsCardOrder = ingredientsCardArr.map(item => {
    const { id, image, name, count, price } = item;
    total += count * price;
    const countPrice = `${count} x ${price}`
    return (
      <IngredientsCardItem 
        key={id}
        image={image}
        name={name}
        countPrice={countPrice}
      />
    )
  });

  const status = order!.status === 'done' ? 'Выполнен' : 'Готовится';

  return (
    <div className={orderinfoStyles.container}>
      <h2>#{order!.number}</h2>
      <div className={orderinfoStyles.content}>
        <h3 className='mt-10 mb-3 text text_type_main-medium'>
          {order!.name}
        </h3>
        <p className={'text text_type_main-default ' + orderinfoStyles.text}>
          {status}
        </p>
        <h4 className='mt-15 mb-4 text text_type_main-medium'>
          Состав:
        </h4>
        <ul className={orderinfoStyles.ingredients}>
          {ingredientsCardOrder}
        </ul>
        <div className={'mt-10 ' + orderinfoStyles.total}>
          <span className='text text_type_main-default text_color_inactive'>
            {dateTime}
          </span>
          <div className={orderinfoStyles.price}>
            <p className='text text_type_digits-default pr-2'>{total}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}