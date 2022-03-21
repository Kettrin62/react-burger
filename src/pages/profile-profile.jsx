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
import { ProfileOrdersPage } from './profile-orders';

export function ProfileProfilePage() {
  const { name, email, token } = useSelector(state => state.user);
  const [changValue, setChangeValue] = useState(false);

  const { state } = useLocation();

  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = e => {
    setEmailValue(e.target.value);
    setChangeValue(true);
  };

  const [passwordValue, setPasswordValue] = React.useState('');
  const onChangePassword = e => {
    setPasswordValue(e.target.value);
    setChangeValue(true);
  };

  const [nameValue, setNameValue] = useState('');
  const onChangeName = e => {
    setNameValue(e.target.value);
    setChangeValue(true);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setEmailValue(email);
    setNameValue(name);
  }, [email, name]);

  const updateUserSubmit = e => {
    e.preventDefault();
    const dataUser = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    };
    if (!token) {
      const refreshToken = getCookie('refreshToken');
      dispatch(updateUserDataToken(refreshToken, dataUser));    
    } else {
      dispatch(updateUserData(token, dataUser));
    }
    setChangeValue(false);
    setPasswordValue('');
  };

  const onClickCancel = () => {
    setEmailValue(email);
    setNameValue(name);
    setPasswordValue('');
    setChangeValue(false);
  };

  return (
    <Form name='profile' onSubmit={updateUserSubmit}>
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
    </Form>
  );
}