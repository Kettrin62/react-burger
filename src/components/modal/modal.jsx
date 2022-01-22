import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';


const modalRoot = document.getElementById('react-modals');


function Modal(props) {

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      props.onClose();
    }
  };

  React.useEffect(()=>{
    // Устанавливаем слушатель события при монтировании
    document.addEventListener('keydown', handleEscClose);

    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClose={props.onClose}>
        <div className={'p-10 ' + modalStyles.container} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <h2 className='text text_type_main-large'>
              {props.header}
            </h2>
            <CloseIcon type="primary" onClick={props.onClose}/>
          </div>
          {props.children}
        </div>
      </ModalOverlay>
    ), 
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Modal;
