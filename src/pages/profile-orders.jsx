import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Orders from '../components/orders/orders';
import { WS_CONNECTION_FINISH, WS_CONNECTION_START_INIT } from '../services/actions/ws';


export function ProfileOrdersPage() {
  const { orders, total, totalToday } = useSelector(state => state.ws);
  console.log(orders);

  const dispatch = useDispatch();


  useEffect(() => {
    // dispatch({ type: WS_CONNECTION_FINISH });
    dispatch({ type: WS_CONNECTION_START_INIT});
    console.log('hdh');
    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    }
  }, []);

  return (
    <Orders />
  );
}