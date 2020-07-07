import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

function SaveTitle({ id, cb }) {
  // update
  let mutation = gql`
    mutation updateTitle($input: UpdateTitleInput) {
      updateTitle(input: $input) {
        title
        updated
      }
    }
  `;
  let variables = { id };

  // new
  if (!id) {
    mutation = gql`
      mutation saveTitle($input: SaveTitleInput) {
        saveTitle(input: $input) {
          title
          id
        }
      }
    `;
    variables = { authoruid: '@mauryakrishna1' };
  }

  const [saveTitle, { loading, error }] = useMutation(mutation, {
    update: (cache, { data }) => {
      if (data.saveTitle) {
        // eslint-disable-next-line no-shadow
        const { id, title } = data.saveTitle;
        // https://stackoverflow.com/questions/58843960/difference-between-writequery-and-writedata-in-apollo-client
        cache.writeData({ data: { id, title } });
      } else if (data.updateTitle) {
        const { updated, title } = data.updateTitle;
        if (updated) {
          cache.writeData({ data: { title } });
        }
      }

      cb(false);
    },
  });

  const [debouncedCallback] = useDebouncedCallback(title => {
    // show the saving in progress state
    cb(true);

    // not a great way to do here but could no think ofother way
    // and there was already too much code written, so the work around
    variables.title = title;

    saveTitle({ variables: { input: variables } });

    if (error) {
      console.log(error);
    }
  }, 3000);

  return debouncedCallback;
}

SaveTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SaveTitle;
