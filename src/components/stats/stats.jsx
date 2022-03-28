import { useSelector, useDispatch } from 'react-redux';
import statsStyles from './stats.module.css';

function Stats() {
  const { orders, total, totalToday } = useSelector(state => state.ws);


  const ordersDone = orders?.map(item => {
    if (item.status === 'done') {
      return (
        <li className={'mb-2 ' + statsStyles.item} key={item._id}>
          <p className={'text text_type_digits-default ' + statsStyles.text}>{item.number}</p>
        </li>
      )
    }
  });

  console.log(ordersDone.length);

  const ordersNotDone = orders?.map(item => {
    if (item.status === 'done') {
      return (
        <li className={'mb-2 ' + statsStyles.item} key={item._id}>
          <p className='text text_type_digits-default'>{item.number}</p>
        </li>
      )
    }
  });

  return (
    <section className={'mt-25 pl-8 ' + statsStyles.section}>
      <div className={statsStyles.orders}>
        <div>
          <h4 className='mb-6 text text_type_main-medium'>
            Готовы:
          </h4>
          <ul className={statsStyles.list}>
            {ordersDone}
            {/* {orders?.map(item => (
              <li className={'mb-2 ' + statsStyles.item} key={item._id}>
                <p className={'text text_type_digits-default ' + statsStyles.text}>{item.number}</p>
              </li>
            ))} */}

            {/* <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li> */}
          </ul>
        </div>
        <div>
          <h4 className='mb-6 text text_type_main-medium'>
            В работе:
          </h4>
          <ul className={statsStyles.list}>
            {ordersNotDone}

            <li className={'mb-2 ' + statsStyles.item}>
              <p className='text text_type_digits-default'>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className='text text_type_digits-default'>034533</p>
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className='text text_type_digits-default'>034533</p>
            </li>
          </ul>
        </div>
      </div>
      <h4 className='mt-15 text text_type_main-medium'>
        Выполнено за все время:
      </h4>
      <span className='text text_type_digits-large'>{total}</span>
      <h4 className='mt-15 text text_type_main-medium'>
        Выполнено за сегодня:
      </h4>
      <span className='text text_type_digits-large'>{totalToday}</span>
    </section>
  );
}

export default Stats;