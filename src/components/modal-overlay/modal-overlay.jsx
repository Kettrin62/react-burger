import PropTypes from 'prop-types';
import modaloverlayStyles from './modal-overlay.module.css';


export const ModalOverlay = (props)=> {
  return (
    <section className={modaloverlayStyles.overlay} onClick={props.onClose}>
      {props.children}
    </section>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};
