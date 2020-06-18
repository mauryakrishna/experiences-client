import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_ID } from '../../queries/experience';

const Save = ({ value, cb }) => {
  const experience = value;

  const client = useApolloClient();
  // check if experience already exist
  const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });

  // update
  let mutation = gql`
    mutation updateExperience($input: UpdateExperienceInput) {
      updateExperience(input: $input) {
        updated
      }
    }
  `;

  let variables = { experience, id };

  // new experience
  if (!id) {
    mutation = gql`
      mutation saveExperience($input: SaveExperienceInput) {
        saveExperience(input: $input) {
          id
        }
      }
    `;

    variables = { experience, authorid: 123 };
  }

  const [saveExperience] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data.saveExperience) {
        // eslint-disable-next-line no-shadow
        const { id } = data.saveExperience;
        cache.writeQuery({
          query: GET_EXPERIENCE_ID,
          data: { id },
        });
      } else if (data.updateExperience) {
        const { updated } = data.updateExperience;
      }

      cb(false);
    },
  });

  const [debouncedCallback] = useDebouncedCallback(() => {
    // start showing the saving in progress
    cb(true);

    saveExperience({
      variables: {
        input: variables,
      },
    });
  }, 5000);

  React.useEffect(() => {
    debouncedCallback();
  }, [experience]);

  return '';
};

Save.propTypes = {
  experience: PropTypes.array.isRequired,
  cb: PropTypes.func.isRequired,
};

export default Save;
