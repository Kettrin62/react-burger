import { useSelector, useDispatch } from 'react-redux';
import Title from '../title/title';
import CardOrder from '../card-order/card-order';
import ordersStyles from './orders.module.css';


function Orders() {
  const { orders, total, totalToday } = useSelector(state => state.ws);
  // console.log(orders);

  return (
    <section className={'pr-8 ' + ordersStyles.section}>
      <Title text='Лента заказов' />
      <ul className={ordersStyles.list}>
        {orders?.map(item => (
          <CardOrder key={item._id} card={item} />
        ))}
      </ul>
    </section>
  );
}

export default Orders;