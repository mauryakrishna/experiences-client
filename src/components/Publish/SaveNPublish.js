import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

import {
  GET_EXPERIENCE_ID,
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
      if (cb) {
        cb();
      }
    },
  });

  const [debouncedCallback] = useDebouncedCallback(async () => {
    const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });
    const authoruid = '@mauryakrishna1';
    const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
    const { experience } = client.readQuery({
      query: GET_EXPERIENCE_EXPERIENCE,
    });

    await savenpublish({
      variables: {
        // here experience is not parsed because while storing in cache its already stringified
        input: { id, authoruid, title, experience: JSON.parse(experience) },
      },
    });
  });

  return debouncedCallback;
};

export default SaveNPublish;
