import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

const AuthorDisplay = ({ id, displayname, shortintro }) => {
  const beautify = displayname.split(' ').join('-');
  return (
    <div>
      <Link to={`/${id}/${beautify}`}>{displayname}</Link>
      <span>{shortintro}</span>
    </div>
  );
};

AuthorDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  shortintro: PropTypes.string.isRequired,
};
export default AuthorDisplay;
