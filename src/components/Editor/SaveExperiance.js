import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import { 
  GET_EXPERIENCE_SLUGKEY, 
  GET_EXPERIENCE_EXPERIENCE, 
  GET_EXPERIENCE_TITLE 
} from '../../queries/experience';
import {
  WAIT,
  MAX_WAIT,
  SAVE_INITIATED,
  SAVE_COMPLETED,
  SAVE_ERROR,
} from '../../ConfigConstants';

const Save = ({ cb }) => {
  const client = useApolloClient();
  const mutation = gql`
    mutation saveExperience($input: SaveExperienceInput) {
      saveExperience(input: $input) {
        slugkey
        saved
      }
    }
  `;

  const [saveExperience] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data.saveExperience) {
        // eslint-disable-next-line no-shadow
        const { saved, slugkey } = data.saveExperience;
        if (saved) {
          // https://stackoverflow.com/questions/58843960/difference-between-writequery-and-writedata-in-apollo-client
          cache.writeData({
            data: { slugkey },
          });
          cb(SAVE_COMPLETED);
        } else {
          cb(SAVE_ERROR);
          console.log('Could not save.');
        }
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(
    () => {
      // start showing the saving in progress
      const { slugkey } = client.readQuery({ query: GET_EXPERIENCE_SLUGKEY });
      const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
      const { experience } = client.readQuery({ query: GET_EXPERIENCE_EXPERIENCE });
      if(title || experience) {
        cb(SAVE_INITIATED);
        saveExperience({
          variables: {
            input: { title, experience: JSON.parse(experience), slugkey },
          },
        });
      }
    },
    WAIT,
    { maxWait: MAX_WAIT },
  );

  return debouncedCallback;
};

Save.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default Save;
