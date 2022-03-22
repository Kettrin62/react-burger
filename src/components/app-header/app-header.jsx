import { useCallback } from 'react';
import Navigation from '../navigation/navigation';
import Link from '../link/link';
import { 
  useHistory,
  useLocation,
} from 'react-router-dom';
import LinkText from '../link-text/link-text';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import appheaderStyles from './app-header.module.css';


function AppHeader() {
  const history = useHistory();
  const { pathname } = useLocation();

  const onClickMain = useCallback(
    () => {
      history.replace({ pathname: '/' });
    },
    [history]
  );

  const onClickProfile = useCallback(
    () => {
      history.replace({ pathname: '/profile' });
    },
    [history]
  );

  const profileLinks = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/profile'
  ]

  return (
    <header className={appheaderStyles.header}>
      <Navigation>
        <Link class={appheaderStyles.link} onClick={onClickMain}>
          <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
          <LinkText type={pathname === "/" ? "primary" : "secondary"} text='Конструктор'/>
        </Link> 
        <Link class={appheaderStyles.link}>
          <ListIcon type='secondary' />
          <LinkText type='secondary' text='Лента заказов' />
        </Link>
      </Navigation>
      <Link class={appheaderStyles.link} onClick={onClickMain}>
        <Logo />
      </Link>
      <Link class={appheaderStyles.link_account} onClick={onClickProfile}>
        <ProfileIcon type={profileLinks.includes(pathname) ? "primary" : 'secondary'} />
        <LinkText type={profileLinks.includes(pathname) ? "primary" : 'secondary'} text='Личный кабинет' />
      </Link>
    </header>
  );
}

export default AppHeader;
