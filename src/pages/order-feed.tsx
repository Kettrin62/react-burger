import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import orderfeedStyles from './order-feed.module.css';
import Orders from '../components/orders/orders';
import Stats from '../components/stats/stats';
import { 
  WS_CONNECTION_FINISH, 
  WS_CONNECTION_START 
} from '../services/actions/ws';

export function OrderFeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    }
  }, [])

  return (
    <main className={orderfeedStyles.content}>
      <Orders />
      <Stats />
    </main>
  );
}