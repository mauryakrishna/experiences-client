import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';

import {
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

import SaveTitle from './SaveTitle';

import { Input } from '../UIElements';

const Title = ({ cb }) => {
  const client = useApolloClient();
  const titleData = client.readQuery({ query: GET_EXPERIENCE_TITLE });
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });
  const saveTitleDebounceCb = SaveTitle({ cb });

  const [title, setTitle] = useState(titleData.title || '');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    if (value.length <= 180) {
      setTitle(value);

      // do not auto save if experience is already published
      if (ispublished) {
        // keep in cache so that can be taken for savenpublish after comparision
        client.writeData({ data: { title: value } });
      } else {
        // placed here to avoid unneccesaary trigger of change this placed here
        saveTitleDebounceCb(value);
      }
    } else {
      setMessage('Max Allowed 180 characters');
      setShowMessage(true);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          w="100%"
          fontSize="30px"
          bg="transparent"
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
