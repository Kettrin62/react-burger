import Title from '../title/title';
import CardOrder from '../card-order/card-order';
import ordersStyles from './orders.module.css';


function Orders() {
  return (
    <section className={'pr-8 ' + ordersStyles.section}>
      <Title text='Лента заказов' />
      <ul className={ordersStyles.list}>
        
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          <CardOrder />
          {/* <Subtitle text='Булки' />
          <IngredientsList type='bun' /> */}
        
          {/* <Subtitle text='Соусы' />
          <IngredientsList type='sauce' /> */}
        
          {/* <Subtitle text='Начинки' />
          <IngredientsList type='main' /> */}
  
      </ul>
    </section>
  );
}

export default Orders;