import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_ID } from '../../queries/experience';

const Publish = ({ cb }) => {
  const client = useApolloClient();
  const mutation = gql`
    mutation publishExperience($input: PublishExperienceInput) {
      publishExperience(input: $input) {
        published
      }
    }
  `;

  const [publish] = useMutation(mutation, {
    update: (cache, { data, error }) => {
      if (data && data.publishExperience) {
        const { published } = data.publishExperience;
        client.writeData({ data: { ispublished: published } });
      } else if (error) {
        console.log(error);
      }

      if (cb) {
        cb(error, data);
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(async () => {
    const authoruid = '@mauryakrishna1';
    const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });

    await publish({ variables: { input: { id, authoruid } } });
    if (cb) {
      cb();
    }
  }, 0);

  return debouncedCallback;
};

export default Publish;
