import React, { useState } from 'react';
import { 
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import loginStyles from './login.module.css';


export function LoginPage() {

  const [emailValue, setEmailValue] = useState('');
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }


  return (
    <section className={loginStyles.container}>
      <div className={loginStyles.content}>
        <h2 className='text text_type_main-medium'>
          Вход
        </h2>
        <Form name='login' class={'mt-6 '}>
          <EmailInput onChange={onChangeEmail} value={emailValue} name={'email'} />
          <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
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
