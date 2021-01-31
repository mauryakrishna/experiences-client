import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_SLUGKEY } from '../../queries/experience';

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
    update: (cache, { data, error }) => {
      if (data && data.publishExperience) {
        const { slug, slugkey, published } = data.publishExperience;
        if (published) {
          cb({ slug, slugkey });
        }
        else {
          console.log("Could not publish experience.", error);
        }
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(async (enablethoughts) => {
    const { slugkey } = client.readQuery({ query: GET_EXPERIENCE_SLUGKEY });
    await publish({ variables: { input: { slugkey, enablethoughts } } });
  }, 0);

  return debouncedCallback;
};

export default Publish;
