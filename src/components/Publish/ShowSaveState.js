/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Code } from '@chakra-ui/core';
import PropTypes from 'prop-types';

import {
  SAVE_NOTHING,
  SAVE_INITIATED,
  SAVE_COMPLETED,
} from '../../ConfigConstants';

const ShowSaveState = ({ state }) => {
  let retState = null;
  let color = null;
  if (state === SAVE_INITIATED) {
    retState = 'Saving...';
    color = 'yellow';
  }
  else if (state === SAVE_COMPLETED) {
    retState = 'Saved';
    color = 'green';
  }
  else if (state === SAVE_NOTHING) {
    retState = '';
    color = 'gray'
  }

  return (
    <Code display="flex" alignItems="center" my={'0.75rem'} px={'0.75rem'} variantColor={color} children={retState} />
  );
};

ShowSaveState.propTypes = {
  state: PropTypes.number.isRequired,
};

export default ShowSaveState;
