import * as React from 'react';
import { useState, useRef } from 'react';
import { 
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import { useDispatch, useSelector } from '../services/hooks';
import { Link,  Redirect, useLocation, useHistory } from "react-router-dom";
import loginStyles from './login.module.css';
import { getLogin } from '../services/actions/login';
import { TUseLocationState } from '../services/types/data';


export function LoginPage() {
  const { isAuthenticated } = useSelector(state => state.user);
  const { state } = useLocation<TUseLocationState>();
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = useState('');
  const onChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  };

  const inputRef = useRef(null);

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      const dataLogin = {
        email: emailValue,
        password: passwordValue
      };
      dispatch(getLogin(dataLogin));
    }
  };

  if (isAuthenticated) {
    return (
      <Redirect to={ state!.from || '/' } />
    )
  };

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
