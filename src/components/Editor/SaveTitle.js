import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import {
  WAIT,
  MAX_WAIT,
  SAVE_INITIATED,
  SAVE_COMPLETED,
} from '../../ConfigConstants';

import { GET_EXPERIENCE_SLUGKEY } from '../../queries/experience';

function SaveTitle({ cb }) {
  const client = useApolloClient();

  const mutation = gql`
    mutation saveTitle($input: SaveTitleInput) {
      saveTitle(input: $input) {
        title
        slugkey
        saved
      }
    }
  `;

  const [saveTitle] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data.saveTitle) {
        // eslint-disable-next-line no-shadow
        const { saved, slugkey, title } = data.saveTitle;
        if (saved) {
          // https://stackoverflow.com/questions/58843960/difference-between-writequery-and-writedata-in-apollo-client
          cache.writeData({ data: { slugkey, title } });
        } else {
          console.log('Could not save title');
        }
      }

      cb(SAVE_COMPLETED);
    },
  });

  const [debouncedCallback] = useDebouncedCallback(
    title => {
      // show the saving in progress state
      cb(SAVE_INITIATED);
      const { slugkey } = client.readQuery({ query: GET_EXPERIENCE_SLUGKEY });
      saveTitle({
        variables: { input: { title, slugkey } },
      });
    },
    WAIT,
    { maxWait: MAX_WAIT },
  );

  return debouncedCallback;
}

SaveTitle.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default SaveTitle;
