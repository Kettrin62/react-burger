import PropTypes from 'prop-types';

function Title(props) {
  return (
    <h1 className='mb-5 mt-5 pt-5 text text_type_main-large'>
      {props.text}
    </h1>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;