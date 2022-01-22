import modaloverlayStyles from './modal-overlay.module.css';


export const ModalOverlay = (props)=> {
  return (
    <section className={modaloverlayStyles.overlay} onClick={props.onClick}>
      {props.children}
    </section>
  );
};