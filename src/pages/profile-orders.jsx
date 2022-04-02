import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOrder from '../components/card-order/card-order';
import Orders from '../components/orders/orders';
import { WS_CONNECTION_FINISH, WS_CONNECTION_START_INIT } from '../services/actions/ws';
import profileordersStyles from './profile-orders.module.css';


export function ProfileOrdersPage() {
  const { ordersUser, totalUser, totalTodayUser } = useSelector(state => state.ws);
  // console.log(ordersUser);

  const dispatch = useDispatch();


  useEffect(() => {
    // dispatch({ type: WS_CONNECTION_FINISH });
    dispatch({ type: WS_CONNECTION_START_INIT});
    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    }
  }, []);

  return (
    <ul className={profileordersStyles.list}>
      {ordersUser?.map(item => (
        <CardOrder key={item._id} card={item} />
      ))}
    </ul>
  );
}