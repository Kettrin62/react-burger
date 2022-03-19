import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Form from '../components/form/form';
import { register } from '../services/actions/register';
import loginStyles from './login.module.css';
import { getCookie } from '../utils/functions';



export function RegisterPage() {
  const { state } = useLocation();
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = React.useState('');
  const onChangeNameValue = e => {
    setNameValue(e.target.value);
  };

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmailValue = e => {
    setEmailValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = React.useState('');
  const onChangePasswordValue = e => {
    setPasswordValue(e.target.value)
  };

  const inputRef = useRef(null);

  const registerSubmit = e => {
    e.preventDefault();
    if (nameValue && emailValue && passwordValue) {
      const dataRegister = {
        name: nameValue,
        email: emailValue,
        password: passwordValue
      };
      dispatch(register(dataRegister));
    }
  };

  const refreshToken = getCookie('refreshToken');

  if (refreshToken) {
    if (!isAuthenticated) {
      return <p>Загрузка...</p>;
    }
  };


  if (isAuthenticated) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  };


  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Регистрация
        </h2>
        <Form name='register' class={'mt-6 '} onSubmit={registerSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChangeNameValue}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <Input
            type={'email'}
            placeholder={'Email'}
            onChange={onChangeEmailValue}
            value={emailValue}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <PasswordInput
            onChange={onChangePasswordValue}
            value={passwordValue} name={'password'}
          />
          <Button type="primary" size='medium'>
            Зарегистрироваться
          </Button>
        </Form>
        <div className={'mt-20 ' + loginStyles.item}>
          <p className='text text_type_main-default'>
            Уже зарегистрированы?
          </p>
          <Link className={'text text_type_main-default ' + loginStyles.link} to='/login'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}