import * as React from 'react';
import { FC } from 'react';

interface ISubtitleProps {
  text: string;
};

const Subtitle: FC<ISubtitleProps> = ({ text }) => {
  return (
    <h2 className='mt-5 mb-3 text text_type_main-medium'>
      {text}
    </h2>
  )
}

export default Subtitle;