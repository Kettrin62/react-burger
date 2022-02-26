import PropTypes from 'prop-types';

function LinkText(props) {
  return (
    <p className={props.type==='primary' ? 'pl-2 text text_type_main-default' : 'pl-2 text text_type_main-default  text_color_inactive'}>
      {props.text}
    </p>
  )
}

LinkText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default LinkText;