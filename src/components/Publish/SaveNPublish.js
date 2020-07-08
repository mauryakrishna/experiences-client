import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { useDebouncedCallback } from 'use-debounce';

const SaveNPublish = () => {
  const mutation = gql`
    mutation saveNPublishExperience($input: SaveNPublishExperienceInput) {
      saveNPublishExperience(input: $input) {
        slug
        slugkey
        published
      }
    }
  `;

  const [savenpublish] = useMutation(mutation);

  const [debouncedCallback] = useDebouncedCallback(
    async ({ id, authoruid }) => {
      await savenpublish({ variables: { input: { id, authoruid } } });
    },
  );

  return debouncedCallback;
};

export default SaveNPublish;
