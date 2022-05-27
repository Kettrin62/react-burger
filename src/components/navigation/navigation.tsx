import * as React from 'react';
import navigationStyles from './navigation.module.css';
import { FC } from 'react';

const Navigation: FC = (props) => {
  return (
    <nav className={navigationStyles.nav}>
      {props.children}
    </nav>
  )
}

export default Navigation;