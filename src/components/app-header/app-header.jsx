import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom'; 
import Navigation from '../navigation/navigation';
import Link from '../link/link';
import LinkText from '../link-text/link-text';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import appheaderStyles from './app-header.module.css';


function AppHeader() {
  const history = useHistory();



  const onClickProfile = useCallback(
    // () => {
    //   history.replace({ pathname: '/profile' });
    // },
    // [history]
  );

  return (
    <header className={appheaderStyles.header}>
      <Navigation>
        <Link class={appheaderStyles.link}>
          <BurgerIcon type='primary' />
          <LinkText type='primary' text='Конструктор'/>
        </Link> 
        <Link class={appheaderStyles.link}>
          <ListIcon type='secondary' />
          <LinkText type='secondary' text='Лента заказов' />
        </Link>
      </Navigation>
      <Logo />
      <Link class={appheaderStyles.link_account} >
        <ProfileIcon type='secondary' />
        <LinkText type='secondary' text='Личный кабинет' />
      </Link>
    </header>
  );
}

export default AppHeader;
