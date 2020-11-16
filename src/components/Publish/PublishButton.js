import React, { useState, useCallback } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import localStorage from 'local-storage';

import FirstPublish from './FirstPublish';
import SaveNPublish from './SaveNPublish';
import history from '../../history';

import { Button } from '../UIElements';

import {
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_EXPERIENCE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

const PublishExperience = () => {
  const client = useApolloClient();
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const [disableButton] = useState(false);
  const [buttonText, setButtonText] = useState(
    ispublished ? 'Save & Publish' : 'Publish',
  );

  const cb = ({ slug, slugkey }) => {
    if (slug && slugkey) {
      history.push(`/${localStorage.get('username')}/${slug}-${slugkey}`);
    }
  };

  let publishDebounce = null;
  if (ispublished) {
    publishDebounce = SaveNPublish({ cb });
  } else {
    publishDebounce = FirstPublish({ cb });
  }

  const [errMessage, setErrMessage] = useState('');

  const handlePublish = useCallback(() => {
    const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
    const { experience } = client.readQuery({
      query: GET_EXPERIENCE_EXPERIENCE,
    });

    if (!title) {
      setErrMessage('Kindly give a title.');
    } else if (!experience) {
      setErrMessage('Kindly add an experience.');
    } else {
      setButtonText('Publishing....');
      // hit api for publish
      publishDebounce();
    }
  });

  return (
    <>
      <Button disabled={disableButton} onClick={handlePublish}>
        {buttonText}
      </Button>
      <span>{errMessage}</span>
    </>
  );
};

export default PublishExperience;
