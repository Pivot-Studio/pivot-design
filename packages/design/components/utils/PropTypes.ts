import PropTypes from 'prop-types';

export const timeoutsShape = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    enter: PropTypes.number,
    exit: PropTypes.number,
    appear: PropTypes.number,
  }).isRequired,
]);

export const classNamesShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string,
    active: PropTypes.string,
  }),
  PropTypes.shape({
    enter: PropTypes.string,
    enterDone: PropTypes.string,
    enterActive: PropTypes.string,
    exit: PropTypes.string,
    exitDone: PropTypes.string,
    exitActive: PropTypes.string,
  }),
]);
