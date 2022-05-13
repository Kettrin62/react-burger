import * as React from 'react';
import * as ReactDOM from 'react-dom';

import caloriccontentStyles from './caloric-content.module.css';
import { useSelector } from '../../services/hooks';
import CaloricContentItem from '../caloric-content-item/caloric-content-item';
import { TCard } from '../../services/types/data';


const CaloricContent = () => {
  const { modalCard } = useSelector(state => state.modal);
  const {
    calories,
    proteins,
    fat,
    carbohydrates
  } = modalCard!;
  return (
    <ul className={'mt-8 mb-5 ' + caloriccontentStyles.list}>
      <CaloricContentItem title='Калории,ккал' quantity={calories} />
      <CaloricContentItem title='Белки, г' quantity={proteins} />
      <CaloricContentItem title='Жиры, г' quantity={fat} />
      <CaloricContentItem title='Углеводы, г' quantity={carbohydrates} />
    </ul>
  );
};

export default CaloricContent;