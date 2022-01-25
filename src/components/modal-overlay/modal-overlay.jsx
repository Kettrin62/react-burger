import PropTypes from 'prop-types';
import modaloverlayStyles from './modal-overlay.module.css';


export const ModalOverlay = (props)=> {
  return (
    <div className={modaloverlayStyles.overlay} onClick={props.onClose}>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};