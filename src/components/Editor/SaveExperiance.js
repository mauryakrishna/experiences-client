import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_SLUGKEY } from '../../queries/experience';

const Save = ({ cb }) => {
  const client = useApolloClient();

  const mutation = gql`
    mutation saveExperience($input: SaveExperienceInput) {
      saveExperience(input: $input) {
        experience
        slugkey
        saved
      }
    }
  `;

  const [saveExperience] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data.saveExperience) {
        // eslint-disable-next-line no-shadow
        const { saved, slugkey, experience } = data.saveExperience;
        if (saved) {
          // https://stackoverflow.com/questions/58843960/difference-between-writequery-and-writedata-in-apollo-client
          cache.writeData({
            data: { slugkey, experience: JSON.stringify(experience) },
          });
        } else {
          console.log('Could not save.');
        }
      }

      cb(false);
    },
  });

  const [debouncedCallback] = useDebouncedCallback(experience => {
    // start showing the saving in progress
    cb(true);
    const { slugkey } = client.readQuery({ query: GET_EXPERIENCE_SLUGKEY });
    saveExperience({
      variables: {
        input: { experience, slugkey },
      },
    });
  }, 3000);

  return debouncedCallback;
};

Save.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default Save;
