import React, { useState, useRef } from 'react';
import { 
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import { useDispatch, useSelector } from 'react-redux';

import loginStyles from './login.module.css';
import { getLogin } from '../services/actions/login';


export function LoginPage() {
  const { loginSuccess } = useSelector(state => state.login);
  const { name, email, token } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmailValue = e => {
    setEmailValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = React.useState('');
  const onChangePasswordValue = e => {
    setPasswordValue(e.target.value)
  };

  const inputRef = useRef(null);

  const loginSubmit = e => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      const dataRegister = {
        email: emailValue,
        password: passwordValue
      };
      dispatch(getLogin(dataRegister));
      console.log(loginSuccess);
    }
  };

  console.log(name, email, token);


  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Вход
        </h2>
        <Form name='login' class={'mt-6 '} onSubmit={loginSubmit}>
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
            value={passwordValue}
            name={'password'}
          />
          <Button type="primary" size='medium'>
            Войти
          </Button>
        </Form>
        <div className={'mt-20 ' + loginStyles.item}>
          <p className='text text_type_main-default'>
            Вы — новый пользователь?
          </p>
          <Link className={'text text_type_main-default ' + loginStyles.link} to='/register'>
            Зарегистрироваться
          </Link>
        </div>
        <div className={'mt-4 ' + loginStyles.item}>
          <p className='text text_type_main-default'>
            Забыли пароль?
          </p>
          <Link className={'text text_type_main-default ' + loginStyles.link} to='/forgot-password'>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
}
