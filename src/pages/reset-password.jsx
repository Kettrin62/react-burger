import React, { useState, useRef } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/form/form';
import { resetPassword } from '../services/actions/reset-password';
import loginStyles from './login.module.css';
import { getCookie } from '../utils/functions';



export function ResetPasswordPage() {
  const { forgotPasswordSuccess } = useSelector(state => state.forgot);
  const { resetPasswordSuccess } = useSelector(state => state.reset);
  const { isAuthenticated } = useSelector(state => state.user);
  const { state } = useLocation();

  const dispatch = useDispatch();

  const [passwordValue, setPasswordValue] = useState('');
  const onChangePasswordValue = e => {
    setPasswordValue(e.target.value);
  };

  const [codeValue, setCodeValue] = React.useState("");
  const onChangeCodeValue = e => {
    setCodeValue(e.target.value);
  };

  const inputRef = useRef(null);

  const resetPasswordSubmit = e => {
    e.preventDefault();
    if (passwordValue && codeValue) {
      dispatch(resetPassword(passwordValue, codeValue));
    }
  };

  if (!forgotPasswordSuccess) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  };

  if (isAuthenticated) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  };

  if (resetPasswordSuccess) {
    return (
      <Redirect to={ '/profile' } />
    )
  };

  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Восстановление пароля
        </h2>
        <Form name='reset-password' class={'mt-6 '} onSubmit={resetPasswordSubmit}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={onChangePasswordValue}
            icon={'ShowIcon'}
            value={passwordValue}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChangeCodeValue}
            value={codeValue}
            name={'code'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <Button type="primary" size='medium'>
            Сохранить
          </Button>
        </Form>
        <div className={'mt-20 ' + loginStyles.item}>
          <p className='text text_type_main-default'>
            Вспомнили пароль?
          </p>
          <Link className={'text text_type_main-default ' + loginStyles.link} to='/login'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}