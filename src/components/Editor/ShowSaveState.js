/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';

const ShowSavedState = ({ state }) => {
  return <span>{state === true ? 'Saving...' : 'Saved'}</span>;
};

ShowSavedState.propTypes = {
  state: PropTypes.bool.isRequired,
};

export default ShowSavedState;
