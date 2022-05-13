import * as React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { FC } from 'react';


const modalRoot = document.getElementById('react-modals')!;

interface IModalProps {
  header: string;
  onClose: () => void;
  type?: string;
};

const Modal: FC<IModalProps> = (props) => {

  React.useEffect(()=>{
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [props.onClose])

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={props.onClose} />
        <div className={'p-10 ' + modalStyles.container} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <h2 
              className={props.type==='digits' ? 
              'text text_type_digits-default' : 
              'text text_type_main-large'}
            >
              {props.header}
            </h2>
            <CloseIcon type="primary" onClick={props.onClose}/>
            </div>
            {props.children}
        </div>
      </>
    ), 
    modalRoot
  );
}

export default Modal;
