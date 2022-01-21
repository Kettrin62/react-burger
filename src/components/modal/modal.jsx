import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';


const modalRoot = document.getElementById('react-modals');

const ModalOverlay = (props)=> {
  return (
    <section className={modalStyles.overlay}>
      {props.children}
    </section>
  );
}

function Modal(props) {

  return ReactDOM.createPortal(
    (
      <ModalOverlay>
        <div className={'p-10 ' + modalStyles.container}>
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

export default Modal;
