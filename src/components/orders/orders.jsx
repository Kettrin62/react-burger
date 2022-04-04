import { useSelector, useDispatch } from 'react-redux';
import Title from '../title/title';
import CardOrder from '../card-order/card-order';
import ordersStyles from './orders.module.css';


function Orders() {
  const { orders } = useSelector(state => state.ws);

  return (
    <section className={ordersStyles.section}>
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