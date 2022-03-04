import React, { useState } from 'react';
import { 
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
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
      <h2 className='text text_type_main-medium'>
        Вход
      </h2>
      <form name='login' className={'mt-6 ' + loginStyles.form}>
        <fieldset className={loginStyles.form__info}>
          <EmailInput onChange={onChangeEmail} value={emailValue} name={'email'} />
          <PasswordInput onChange={onChangePassword} value={passwordValue} name={'password'} />
          <Button type="primary" size='medium'>
            Войти
          </Button>
        </fieldset>
      </form>
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
    </section>
  );
}
