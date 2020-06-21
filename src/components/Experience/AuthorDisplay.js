import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

const AuthorDisplay = ({ id, displayname, shortintro }) => {
  return (
    <div>
      <Link to={`/${id}/author`}>{displayname}</Link>
      <span>{shortintro}</span>
    </div>
  );
};

AuthorDisplay.propTypes = {
  id: PropTypes.number.isRequired,
  displayname: PropTypes.string.isRequired,
  shortintro: PropTypes.string.isRequired,
};
export default AuthorDisplay;
