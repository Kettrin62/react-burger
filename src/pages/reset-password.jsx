import React, { useState, useRef } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';


export function ResetPasswordPage() {

  const [emailValue, setEmailValue] = useState('');

  const inputRef = useRef(null);



  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Восстановление пароля
        </h2>
        <Form name='reset-password' class={'mt-6 '}>
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