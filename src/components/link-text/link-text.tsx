import { FC } from 'react';

type TType = 'primary' | 'secondary';

interface ILinkTextProps {
  type: TType;
  text: string;
};

const LinkText: FC<ILinkTextProps> = ({ type, text }) => {
  return (
    <p 
      className={type==='primary' ? 
      'pl-2 text text_type_main-default' : 
      'pl-2 text text_type_main-default  text_color_inactive'}
    >
      {text}
    </p>
  )
}

export default LinkText;