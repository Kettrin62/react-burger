import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FC } from 'react';

interface ILinkProps {
  class: string;
  onClick: () => void;
};

const Link: FC<ILinkProps> = (props) => {
  return (
    <a className={'mt-4 mb-4 pl-5 pr-5 ' + props.class} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

export default Link;