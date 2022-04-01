import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import IngredientsCardItem from '../components/ingredients-card-item/ingredients-card-item';
import { WS_CONNECTION_FINISH, WS_CONNECTION_START, WS_CONNECTION_START_INIT } from '../services/actions/ws';
import { showMessageDateTime } from '../utils/functions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderinfoStyles from './order-info.module.css';


export function OrderInfoPage() {
  const { ingredients } = useSelector(state => state.ingredients);
  const { orders } = useSelector(state => state.ws);
  const wsData = useSelector(state => state.ws)
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const id = useParams().id.slice(1);
  // console.log(id);
  // console.log(match);

  // useEffect(() => {
  //   dispatch({ type: WS_CONNECTION_START });
  //   return () => {
  //     dispatch({ type: WS_CONNECTION_FINISH });
  //   }
  // }, []);

  useEffect(() => {
    if (match.path === 'profile/orders/:id') {
      dispatch({ type: WS_CONNECTION_START_INIT });
      return () => {
        dispatch({ type: WS_CONNECTION_FINISH });
      };
    }
  }, [match]);

  const order = orders?.find(({ _id }) => _id === id);
  // console.log(orders);
  // console.log(order);


  const date = new Date(order?.createdAt);
  const dateTime = showMessageDateTime(date);

  const ingredientsCardObj = {};


  order?.ingredients.forEach(item => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    item in ingredientsCardObj ? ingredientsCardObj[item].count += 1 : ingredientsCardObj[item] = {
      id: ingredient._id,
      name: ingredient.name,
      image: ingredient.image_mobile,
      count: 1,
      price: ingredient.price
    };
  });


  const ingredientsCardArr = Object.values(ingredientsCardObj);
  // console.log(ingredientsCardArr);
  
  let total = 0;

  const ingredientsCardOrder = ingredientsCardArr.map(item => {
    const { id, image, name, count, price } = item;
    total += count * price;
    // console.log(item);
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

  const status = order?.status === 'done' ? 'Выполнен' : 'Готовится';


  return (
    <div className={orderinfoStyles.container}>
      <h2>#{order?.number}</h2>
      <div className={orderinfoStyles.content}>
      <h3 className='mt-10 mb-3 text text_type_main-medium'>
        {order?.name}
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