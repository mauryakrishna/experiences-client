import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

const AuthorDisplay = ({ uid, displayname, shortintro }) => {
  return (
    <div>
      <Link to={`/author/${uid}`}>{displayname}</Link>
      <span>{shortintro}</span>
    </div>
  );
};

AuthorDisplay.propTypes = {
  uid: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  shortintro: PropTypes.string.isRequired,
};
export default AuthorDisplay;
