import React, { useState, useEffect } from 'react';
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

  const [title, setTitle] = useState(titleData.title || '');

  const saveTitleDebounceCb = SaveTitle({ id, cb });

  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    if (value.length <= 460) {
      setTitle(value);

      // placed here to avoid unneccesaary trigger of change this placed here
      saveTitleDebounceCb(value);
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
    </React.Fragment>
  );
};

Title.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default Title;
