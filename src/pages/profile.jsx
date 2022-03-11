import React, { useState, useRef } from 'react';
import { 
  Input,

} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import profileStyles from './profile.module.css';


export function ProfilePage() {

  const [emailValue, setEmailValue] = useState('mail@stellar.burgers');
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  };

  const [passwordValue, setPasswordValue] = React.useState('lalala')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  };

  const [nameValue, setNameValue] = useState('Марк');

  const inputRef = useRef(null);





  return (
    <section className={profileStyles.container}>
      <div className={'mr-15 ' + profileStyles.navigation}>
        <ul className={profileStyles.list}>
          <li className={profileStyles.list__item}>
            <NavLink
              to='/profile'
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
              activeClassName={'text text_type_main-medium ' + profileStyles.link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/profile/orders'
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
              activeClassName={'text text_type_main-medium ' + profileStyles.link_active}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <Link
              to='/'
              className={'text text_type_main-medium text_color_inactive ' + profileStyles.link}
            >
              Выход
            </Link>
          </li>
        </ul>
        <p className='mt-20 text text_type_main-default text_color_inactive '>
          В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
        </p>
      </div>
      <Form name='profile'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          icon={'EditIcon'}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={onChangeEmail}
          icon={'EditIcon'}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChangePassword}
          icon={'EditIcon'}
          value={passwordValue}
          name={'password'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
        />
      </Form>
    </section>
  );
}
