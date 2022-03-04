import React, { useState, useRef } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css';


export function ResetPasswordPage() {

  const [emailValue, setEmailValue] = useState('');

  const inputRef = useRef(null);



  return (
    <section className={loginStyles.container}>
      <h2 className='text text_type_main-medium'>
        Восстановление пароля
      </h2>
      <form name='login' className={'mt-6 ' + loginStyles.form}>
        <fieldset className={loginStyles.form__info}>
          <Input
            type={'email'}
            placeholder={'Введите новый пароль'}
            onChange={e => setEmailValue(e.target.value)}
            icon={'ShowIcon'}
            value={emailValue}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'Введите код из письма'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button type="primary" size='medium'>
            Сохранить
          </Button>
        </fieldset>
      </form>
      <div className={'mt-20 ' + loginStyles.item}>
        <p className='text text_type_main-default'>
          Вспомнили пароль?
        </p>
        <Link className={'text text_type_main-default ' + loginStyles.link} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  );
}