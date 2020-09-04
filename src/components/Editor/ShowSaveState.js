/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

import {
  SAVE_NOTHING,
  SAVE_INITIATED,
  SAVE_COMPLETED,
} from '../../ConfigConstants';

const ShowSaveState = ({ state }) => {
  let retState = null;
  if (state === SAVE_INITIATED) {
    retState = 'Saving...';
  }

  if (state === SAVE_COMPLETED) {
    retState = 'Saved';
  }

  if (state === SAVE_NOTHING) {
    retState = '';
  }
  return retState;
};

ShowSaveState.propTypes = {
  state: PropTypes.number.isRequired,
};

export default ShowSaveState;
