import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_ID } from '../../queries/experience';

const Publish = ({ cb }) => {
  const client = useApolloClient();
  const mutation = gql`
    mutation publishExperience($input: PublishExperienceInput) {
      publishExperience(input: $input) {
        slug
        slugkey
        published
      }
    }
  `;

  const [publish] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data && data.publishExperience) {
        const { slug, slugkey, published } = data.publishExperience;
        if (published) {
          cb({ slug, slugkey });
        }
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(async () => {
    const authoruid = '@mauryakrishna1';
    const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });

    await publish({ variables: { input: { id, authoruid } } });
  }, 0);

  return debouncedCallback;
};

export default Publish;
