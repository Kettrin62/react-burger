import * as React from 'react';
import { FC } from 'react';
import caloriccontentitemStyles from './caloric-content-item.module.css';


interface ICaloricContentItemProps {
  title: string;
  quantity: number;
};

const CaloricContentItem: FC<ICaloricContentItemProps> = ({ title, quantity}) => {
  return (
    <li className={'mr-5 ' + caloriccontentitemStyles.item}>
      <h4 className='text text_type_main-default text_color_inactive'>{title}</h4>
      <span className='text text_type_digits-default text_color_inactive'>{quantity}</span>
    </li>
  );
};

export default CaloricContentItem;