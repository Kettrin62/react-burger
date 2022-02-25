import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const Menu = (props) => {
  return (
    <div style={{ display: 'flex' }} className='mb-5'>
      <Tab value='one' active={props.current === 'one'} onClick={() => props.bunScroll()}>
        Булки
      </Tab>
      <Tab value='two' active={props.current === 'two'} onClick={() => props.sauceScroll()}>
        Соусы
      </Tab>
      <Tab value='three' active={props.current === 'three'} onClick={() => props.mainScroll()}>
        Начинки
      </Tab>
    </div>
  )
}

Menu.propTypes = {
  bunScroll: PropTypes.func.isRequired,
  sauceScroll: PropTypes.func.isRequired,
  mainScroll: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
};

export default Menu;