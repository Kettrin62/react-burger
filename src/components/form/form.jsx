import PropTypes from 'prop-types';
import formStyles from './form.module.css';

function Form(props) {
  return (
    <form name={props.name} className={props.class} onSubmit={props.onSubmit}>
      <fieldset className={formStyles.form__info}>
        {props.children}
      </fieldset>
    </form>
  )
};

Form.propTypes = {
  name: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
};

export default Form;