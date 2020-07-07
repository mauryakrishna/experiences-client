import React, { useState, useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';

import {
  GET_EXPERIENCE_ID,
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_EXPERIENCE,
} from '../../queries/experience';

const PublishExperience = () => {
  const client = useApolloClient();

  const authoruid = '@mauryakrishna1';

  const [disableButton] = useState(false);
  const [buttonText, setButtonText] = useState('Publish');
  const [errMessage, setErrMessage] = useState('');

  const PUBLISH_EXPERIENCE_MUTATION = gql`
    mutation publishExperience($input: PublishExperienceInput) {
      publishExperience(input: $input) {
        published
      }
    }
  `;

  const [publish, { loading, error }] = useMutation(
    PUBLISH_EXPERIENCE_MUTATION,
    {
      update: (cache, { data }) => {
        // redirect to publish
        setButtonText('Published');
      },
    },
  );

  const handlePublish = useCallback(() => {
    const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });
    const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
    const { experience } = client.readQuery({
      query: GET_EXPERIENCE_EXPERIENCE,
    });

    if (!title) {
      setErrMessage('Kindly give a title.');
    } else if (!experience) {
      setErrMessage('Kindly add an experience');
    } else {
      // hit api for publish
      publish({ variables: { input: { id, authoruid } } });
      setButtonText('Publishing....');
    }
  });

  if (loading) {
    console.log('loading', loading);
  }

  return (
    <>
      <button type="button" disabled={disableButton} onClick={handlePublish}>
        {buttonText}
      </button>
      <span>{errMessage}</span>
    </>
  );
};

export default PublishExperience;
