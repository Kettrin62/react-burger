import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { showMessageDateTime } from '../../utils/functions';

function CardOrderDetails() {
  const { ingredients } = useSelector(state => state.ingredients);
  const { modalCard } = useSelector(state => state.modal);
  console.log(modalCard);
  const { name, ingredients: ingredientsId, createdAt } = modalCard;
  const date = new Date(createdAt);
  const dateTime = showMessageDateTime(date);

  // const ingredientsAllCard = ingredientsId.map(item => {
  //   return ingredients.find(
  //     (el) => el._id === item
  //     );
  //   });
  // const total = ingredientsAllCard.reduce((acc, item) => acc + item.price, 0);
  // console.log(ingredientsAllCard);



  const ingredientsCardObj = {}
  ingredientsId.forEach(item => {
    const ingredient = ingredients.find(
      (el) => el._id === item
    );
    item in ingredientsCardObj ? ingredientsCardObj[item].count += 1 : ingredientsCardObj[item] = {
      id: ingredient._id,
      name: ingredient.name,
      image: ingredient.image_mobile,
      count: 1,
      price: ingredient.price
    };
  });

  const ingredientsCardArr = Object.values(ingredientsCardObj);
  
  let total = 0;

  const ingredientsCard = ingredientsCardArr.map(item => {
    const { id, image, name, count, price } = item;
    total += count * price;
    console.log(item);
    return (
      <li key={id}>
        <img src={image}/>
        <p>{name}</p>
        <p>{count}x{price}</p>
      </li>
    )
  });


  console.log(total);


  const status = modalCard.status === 'done' ? 'Выполнен' : 'Готовится';

  return (
    <div>
      <h3>
        {name}
      </h3>
      <p>
        {status}
      </p>
      <h4>
        Состав:
      </h4>
      <ul>
        {ingredientsCard}
      </ul>
      <div>
        <span className='text text_type_main-default text_color_inactive'>
          {dateTime}
        </span>
        <div>
          <p className='text text_type_digits-default'>{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )

}

export default CardOrderDetails;