import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch } from '../../services/hooks';
import { getCookie } from '../../utils/functions';
import { logout } from '../../services/actions/logout';

import profilenavStyles from './profile-nav.module.css';

function ProfileNav() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const onClickLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logout(refreshToken));
  };

  return (
    <div className={'mr-15 ' + profilenavStyles.navigation}>
      <ul className={profilenavStyles.list}>
        <li>
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
      {(pathname === '/profile') ? (
        <p className='mt-20 text text_type_main-default text_color_inactive '>
          В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
        </p>) : (
        <p className='mt-20 text text_type_main-default text_color_inactive '>
          В&nbsp;этом разделе вы&nbsp;можете просмотреть&nbsp;свою историю заказов
        </p>
      )}
    </div>
  )
};

export default ProfileNav;