import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import { useDispatch, useSelector } from '../services/hooks';
import { getCookie } from '../utils/functions';
import profileprofileStyles from './profile-profile.module.css';
import { 
  updateUserDataToken,
  updateUserData
} from '../services/actions/user';

export function ProfileProfilePage() {
  const { name, email, token } = useSelector(state => state.user);
  const [changValue, setChangeValue] = useState(false);

  const { state } = useLocation();

  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setChangeValue(true);
  };

  const [passwordValue, setPasswordValue] = React.useState('');
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    setChangeValue(true);
  };

  const [nameValue, setNameValue] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setChangeValue(true);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setEmailValue(email);
    setNameValue(name);
  }, [email, name]);

  const updateUserSubmit = (e: React.FormEvent) => {
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
    <div className={profileprofileStyles.container}>
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
          <div className={profileprofileStyles.buttons}>
            <Button type="primary" size='medium'>
              Сохранить
            </Button>
            <Button type="primary" size='medium' onClick={onClickCancel}>
              Отмена
            </Button>
          </div>
        }
      </Form>
    </div>
  );
}