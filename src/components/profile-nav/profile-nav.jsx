import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../utils/functions';
import { logout } from '../../services/actions/logout';

import profilenavStyles from './profile-nav.module.css';

function ProfileNav(props) {
  const dispatch = useDispatch();

  const onClickLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logout(refreshToken));
  };

  return (
    // <form name={props.name} className={props.class} onSubmit={props.onSubmit}>
    //   <fieldset className={formStyles.form__info}>
    //     {props.children}
    //   </fieldset>
    // </form>
    <div className={'mr-15 ' + profilenavStyles.navigation}>
        <ul className={profilenavStyles.list}>
          <li className={profilenavStyles.list__item}>
            <NavLink
              exact
              to='/profile'
              className={'text text_type_main-medium text_color_inactive ' + profilenavStyles.link}
              activeClassName={'text text_type_main-medium ' + profilenavStyles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/orders'
              className={'text text_type_main-medium text_color_inactive ' + profilenavStyles.link}
              activeClassName={'text text_type_main-medium ' + profilenavStyles.link_active}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <p
              className={'text text_type_main-medium text_color_inactive ' + profilenavStyles.link}
              onClick={onClickLogout}
            >
              Выход
            </p>
          </li>
        </ul>
        <p className='mt-20 text text_type_main-default text_color_inactive '>
          В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
        </p>
      </div>
  )
};

// Form.propTypes = {
//   name: PropTypes.string.isRequired,
//   class: PropTypes.string.isRequired,
// };

export default ProfileNav;