import React, { useState, useRef } from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';


export function RegisterPage() {

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const [nameValue, setNameValue] = React.useState('')
  const inputRef = useRef(null);



  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Регистрация
        </h2>
        <Form name='register' class={'mt-6 '}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <EmailInput onChange={onChangeEmail} value={emailValue} name={'email'} size='default' />
          <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
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