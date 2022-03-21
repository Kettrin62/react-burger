import { useState, useRef } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/form/form';
import { forgotPassword } from '../services/actions/forgot-password';
import loginStyles from './login.module.css';
import { getCookie } from '../utils/functions';


export function ForgotPasswordPage() {
  const { forgotPasswordSuccess } = useSelector(state => state.forgot);
  const { isAuthenticated } = useSelector(state => state.user);
  const { state } = useLocation();

  console.log(isAuthenticated)
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');

  const inputRef = useRef(null);

  const forgotPasswordSubmit = e => {
    e.preventDefault();
    if (emailValue) {
      dispatch(forgotPassword(emailValue));
    }
  };

  if (forgotPasswordSuccess) {
    return (
      <Redirect to={{ pathname: '/reset-password' }} />
    )
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
          Восстановление пароля
        </h2>
        <Form name='forgot-password' class={'mt-6 '} onSubmit={forgotPasswordSubmit}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            name={'email'}
            error={false}
            ref={inputRef}
            errorText={'Ошибка'}
          />
          <Button type="primary" size='medium'>
            Восстановить
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