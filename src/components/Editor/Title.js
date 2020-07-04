import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';

import {
  GET_EXPERIENCE_ID,
  GET_EXPERIENCE_TITLE,
} from '../../queries/experience';

import SaveTitle from './SaveTitle';
import s from './Editor.css';

const Title = ({ cb }) => {
  useStyles(s);

  const client = useApolloClient();
  const titleData = client.readQuery({ query: GET_EXPERIENCE_TITLE });
  const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });
  const saveTitleDebounceCb = SaveTitle({ id, cb });

  const [title, setTitle] = useState(titleData.title || '');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    if (value.length <= 180) {
      setTitle(value);

      // placed here to avoid unneccesaary trigger of change this placed here
      saveTitleDebounceCb(value);
    } else {
      setMessage('Max Allowed 180 characters');
      setShowMessage(true);
    }
  };

  return (
    <React.Fragment>
      <div className={s.placeholdercontainer}>
        <input
          className={s.placeholder}
          placeholder="Start with the title..."
          value={title}
          onChange={validateTitle}
          maxLength="460"
        />
      </div>
      {showMessage && <span>{message}</span>}
    </React.Fragment>
  );
};

Title.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default Title;
