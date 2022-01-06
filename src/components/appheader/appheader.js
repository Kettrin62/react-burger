import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import appheaderStyles from './appheader.module.css';

function Navigation(props) {
  return (
    <nav className={appheaderStyles.nav}>
      {props.children}
    </nav>
  )
}

function Link(props) {
  return (
    <a className={appheaderStyles.link}>
      {props.children}
    </a>
  )
}

function LinkText(props) {
  return (
    <p className={props.type==="primary" ? "text text_type_main-default" : "text text_type_main-default  text_color_inactive"}>{props.text}</p>
  )
}

function AppHeader() {
  return (
    <header className={appheaderStyles.header}>
      <Navigation>
        <Link>
          <BurgerIcon type="primary" />
          <LinkText type="primary" text="Конструктор"/>
        </Link> 
        <Link>
          <ListIcon type="secondary" />
          <LinkText type="secondary" text="Лента заказов" />
        </Link>
      </Navigation>
      <Logo />
      <Link>
        <ProfileIcon type="secondary" />
        <LinkText type="secondary" text="Личный кабинет" />
      </Link>
    </header>
  );
}

export default AppHeader;
