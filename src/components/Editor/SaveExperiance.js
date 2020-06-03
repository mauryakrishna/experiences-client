import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import useStyles from 'isomorphic-style-loader/useStyles';
import { useDebouncedCallback } from 'use-debounce';

import s from './Editor.css';

const Save = ({ experience }) => {
  useStyles(s);

  const SAVE_EXPERIENCE_MUTATION = gql`
    mutation saveExperience($input: SaveExperienceInput) {
      saveExperience(input: $input) {
        id
      }
    }
  `;

  const [saveExperience, { loading }] = useMutation(SAVE_EXPERIENCE_MUTATION);

  const [debouncedCallback] = useDebouncedCallback(() => {
    saveExperience({
      variables: {
        input: { experience: JSON.stringify(experience), authorid: 123 },
      },
    });
  }, 5000);

  React.useEffect(() => {
    debouncedCallback();
  }, [experience]);

  if (loading) {
    return <span>Saving...</span>;
  }

  return (
    <div>
      <span>Saved</span>
    </div>
  );
};

Save.propTypes = { experience: PropTypes.array.isRequired };

export default Save;
