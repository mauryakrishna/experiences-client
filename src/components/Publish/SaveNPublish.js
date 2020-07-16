import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

import {
  GET_EXPERIENCE_SLUGKEY,
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_EXPERIENCE,
} from '../../queries/experience';

const SaveNPublish = ({ cb }) => {
  const client = useApolloClient();

  const mutation = gql`
    mutation saveNPublishExperience($input: SaveNPublishExperienceInput) {
      saveNPublishExperience(input: $input) {
        slug
        slugkey
        published
      }
    }
  `;

  const [savenpublish] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data && data.saveNPublishExperience) {
        const { slug, slugkey, published } = data.saveNPublishExperience;
        if (published) {
          cb({ slug, slugkey });
        }
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(async () => {
    const { slugkey } = client.readQuery({ query: GET_EXPERIENCE_SLUGKEY });
    const authoruid = '@mauryakrishna1';
    const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
    const { experience } = client.readQuery({
      query: GET_EXPERIENCE_EXPERIENCE,
    });

    await savenpublish({
      variables: {
        // here experience is not parsed because while storing in cache its already stringified
        input: {
          slugkey,
          authoruid,
          title,
          experience: JSON.parse(experience),
        },
      },
    });
  });

  return debouncedCallback;
};

export default SaveNPublish;
