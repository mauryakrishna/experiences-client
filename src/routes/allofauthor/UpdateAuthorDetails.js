import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

const UpdateAuthorDetails = () => {
  const SAVE_MUTATION = gql`
    mutation updateAuthor($input: UpdateAuthorInput) {
      updateAuthor(input: $input) {
        updated
      }
    }
  `;

  const [update] = useMutation(SAVE_MUTATION);

  const [debouncedCallback] = useDebouncedCallback(
    async ({ displayname, shortintro, authoruid, cb }) => {
      await update({
        variables: { input: { displayname, shortintro, authoruid } },
      });
      cb(true);
    },
    1,
  );

  return debouncedCallback;
};

export default UpdateAuthorDetails;
