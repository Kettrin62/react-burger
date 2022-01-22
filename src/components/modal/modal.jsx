import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = (props)=> {
  return (
    <section className={modalStyles.overlay} onClick={props.onClick}>
      {props.children}
    </section>
  );
}

function Modal(props) {

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      props.onClick();
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
      <ModalOverlay onClick={props.onClick}>
        <div className={'p-10 ' + modalStyles.container} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <h2 className='text text_type_main-large'>
              {props.header}
            </h2>
            <CloseIcon type="primary" onClick={props.onClick}/>
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
