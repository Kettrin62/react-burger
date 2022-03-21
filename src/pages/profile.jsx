import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../utils/functions';
import { logout } from '../services/actions/logout';
import profileStyles from './profile.module.css';
import { 
  updateUserDataToken,
  updateUserData
} from '../services/actions/user';
import ProfileNav from '../components/profile-nav/profile-nav';
import { ProfileProfilePage } from './profile-profile';
import { ProfileOrdersPage } from './profile-orders';


export function ProfilePage() {
  // const { name, email, token } = useSelector(state => state.user);
  // const [changValue, setChangeValue] = useState(false);

  // const { state } = useLocation();

  const dispatch = useDispatch();

  // const [emailValue, setEmailValue] = useState('');
  // const onChangeEmail = e => {
  //   setEmailValue(e.target.value);
  //   setChangeValue(true);
  // };

  // const [passwordValue, setPasswordValue] = React.useState('');
  // const onChangePassword = e => {
  //   setPasswordValue(e.target.value);
  //   setChangeValue(true);
  // };

  // const [nameValue, setNameValue] = useState('');
  // const onChangeName = e => {
  //   setNameValue(e.target.value);
  //   setChangeValue(true);
  // };

  // const inputRef = useRef(null);

  // useEffect(() => {
  //   setEmailValue(email);
  //   setNameValue(name);
  // }, [email, name]);

  const onClickLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logout(refreshToken));
  };
  
  // const updateUserSubmit = e => {
  //   e.preventDefault();
  //   const dataUser = {
  //     name: nameValue,
  //     email: emailValue,
  //     password: passwordValue
  //   };
  //   if (!token) {
  //     const refreshToken = getCookie('refreshToken');
  //     dispatch(updateUserDataToken(refreshToken, dataUser));    
  //   } else {
  //     dispatch(updateUserData(token, dataUser));
  //   }
  //   setChangeValue(false);
  //   setPasswordValue('');
  // };

  // const onClickCancel = () => {
  //   setEmailValue(email);
  //   setNameValue(name);
  //   setPasswordValue('');
  //   setChangeValue(false);
  // };

  return (
    <section className={profileStyles.container}>
      <Router>
        <ProfileNav />
      {/* <div className={'mr-15 ' + profileStyles.navigation}>
        <ul className={profileStyles.list}>
          <li className={profileStyles.list__item}>
            <NavLink
              exact
              to='/profile'
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
              activeClassName={'text text_type_main-medium ' + profileStyles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/orders'
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
              activeClassName={'text text_type_main-medium ' + profileStyles.link_active}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <p
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
              onClick={onClickLogout}
            >
              Выход
            </p>
          </li>
        </ul>
        <p className='mt-20 text text_type_main-default text_color_inactive '>
          В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
        </p>
      </div> */}
      <Switch>
      <Route path="/profile" exact={true}>
      <ProfileProfilePage />
      {/* <Form name='profile' onSubmit={updateUserSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChangeName}
          icon={'EditIcon'}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={onChangeEmail}
          icon={'EditIcon'}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChangePassword}
          icon={'EditIcon'}
          value={passwordValue}
          name={'password'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        {
          changValue && 
          <div className={profileStyles.buttons}>
            <Button type="primary" size='medium'>
              Сохранить
            </Button>
            <Button type="primary" size='medium' onClick={onClickCancel}>
              Отмена
            </Button>
          </div>
        }
      </Form> */}
      </Route>
      <Route path="/profile/orders" exact={true}>
              <ProfileOrdersPage />
            </Route>
      </Switch>
      </Router>
    </section>
  );
}
