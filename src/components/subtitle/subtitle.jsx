import PropTypes from 'prop-types';


function Subtitle({ text }) {
  return (
    <h2 className='mt-5 mb-3 text text_type_main-medium'>
      {text}
    </h2>
  )
}

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Subtitle;