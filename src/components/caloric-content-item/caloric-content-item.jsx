import PropTypes from 'prop-types';
import caloriccontentitemStyles from './caloric-content-item.module.css';


const CaloricContentItem = (props) => {
  return (
    <li className={'mr-5 ' + caloriccontentitemStyles.item}>
      <h4 className='text text_type_main-default text_color_inactive'>{props.title}</h4>
      <span className='text text_type_digits-default text_color_inactive'>{props.quantity}</span>
    </li>
  );
};

CaloricContentItem.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
};

export default CaloricContentItem;