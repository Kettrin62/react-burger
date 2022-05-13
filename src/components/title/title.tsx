import * as React from 'react';
import { FC } from 'react';

interface ITitleProps {
  text: string;
};

const Title: FC<ITitleProps> = ({ text }) => {
  return (
    <h1 className='mb-5 mt-5 pt-5 text text_type_main-large'>
      {text}
    </h1>
  )
}

export default Title;