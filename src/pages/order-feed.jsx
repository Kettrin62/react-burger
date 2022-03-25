import orderfeedStyles from './order-feed.module.css';
import Orders from '../components/orders/orders';
import Stats from '../components/stats/stats';


export function OrderFeedPage() {
  return (
    <main className={orderfeedStyles.content}>
      <Orders />
      <Stats />
    </main>
  );
}