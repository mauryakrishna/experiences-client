import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import { GET_EXPERIENCE_ID } from '../../queries/experience';

function SaveTitle({ id, cb }) {
  // update
  let mutation = gql`
    mutation updateTitle($input: UpdateTitleInput) {
      updateTitle(input: $input) {
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
        const { id } = data.saveTitle;

        cache.writeQuery({
          query: GET_EXPERIENCE_ID,
          data: { id },
        });
      } else if (data.updateTitle) {
        const { updated } = data.updateTitle;
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
