import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_ID } from '../../queries/experience';

const Save = ({ id, cb }) => {
  // update
  let mutation = gql`
    mutation updateExperience($input: UpdateExperienceInput) {
      updateExperience(input: $input) {
        updated
      }
    }
  `;

  let variables = { id };

  // new experience
  if (!id) {
    mutation = gql`
      mutation saveExperience($input: SaveExperienceInput) {
        saveExperience(input: $input) {
          id
        }
      }
    `;

    variables = { authoruid: '@mauryakrishna1' };
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

  const [debouncedCallback] = useDebouncedCallback(experience => {
    // start showing the saving in progress
    cb(true);

    // again
    variables.experience = experience;
    saveExperience({
      variables: {
        input: variables,
      },
    });
  }, 3000);

  return debouncedCallback;
};

Save.propTypes = {
  experience: PropTypes.array.isRequired,
  cb: PropTypes.func.isRequired,
};

export default Save;
