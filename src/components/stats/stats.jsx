import statsStyles from './stats.module.css';

function Stats() {
  return (
    <section className={'mt-25 pl-8 ' + statsStyles.section}>
      <div className={statsStyles.orders}>
        <div>
          <h4 className='mb-6 text text_type_main-medium'>
            Готовы:
          </h4>
          <ul className={statsStyles.list}>
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
            </li>
            <li className={'mb-2 ' + statsStyles.item}>
              <p className={'text text_type_digits-default ' + statsStyles.text}>034533</p>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='mb-6 text text_type_main-medium'>
            В работе:
          </h4>
          <ul className={statsStyles.list}>
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
      <span className='text text_type_digits-large'>28 752</span>
    
      <h4 className='mt-15 text text_type_main-medium'>
        Выполнено за сегодня:
      </h4>
      <span className='text text_type_digits-large'>138</span>
      
    </section>
  );
}

export default Stats;