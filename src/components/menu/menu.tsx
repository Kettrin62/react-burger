import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { TTabCurrent } from '../../services/types/data';

interface IMenuProps {
  bunScroll: () => void;
  sauceScroll: () => void;
  mainScroll: () => void;
  current: TTabCurrent;
}

const Menu: FC<IMenuProps> = (props) => {
  return (
    <div style={{ display: 'flex' }} className='mb-5'>
      <Tab value='one' active={props.current === 'one'} onClick={() => props.bunScroll()}>
        Булки
      </Tab>
      <Tab value='two' active={props.current === 'two'} onClick={() => props.sauceScroll()}>
        Соусы
      </Tab>
      <Tab value='three' active={props.current === 'three'} onClick={() => props.mainScroll()}>
        Начинки
      </Tab>
    </div>
  )
}

export default Menu;