import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderdetailsStyles from './order-details.module.css';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { order, orderRequest, orderFailed } = useSelector(state => state.order);

  if (orderFailed) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (orderRequest) {
    return <p>Загрузка...</p>
  } else {
    return (
      <div className={orderdetailsStyles.container}>
      <h2 className='mt-5 text text_type_digits-large'>
        {order}
      </h2>
      <p className='mt-8 text text_type_main-medium'>
        идентификатор заказа
      </p>
      <div className={'mb-15 mt-15 ' + orderdetailsStyles.icon}>
        <CheckMarkIcon type="primary" />
      </div> 
      <p className='text text_type_main-default'>
        Ваш заказ начали готовить
      </p>
      <span className='mt-2 mb-20 text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
    );
  }
}

export default OrderDetails;