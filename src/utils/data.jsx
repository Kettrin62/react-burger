import PropTypes from 'prop-types';

export const cardPropTypes = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
});

export const BASEURL= 'https://norma.nomoreparties.space/api';

export const cardOrderPropTypes = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
});