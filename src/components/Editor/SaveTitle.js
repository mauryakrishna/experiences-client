import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { useDebouncedCallback } from 'use-debounce';

import s from './Editor.css';
import { GET_EXPERIENCE_ID } from '../../queries/experience';

const SaveTitle = ({ title, cb }) => {
  const client = useApolloClient();
  // check if experience already exist
  const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });

  // update
  let mutation = gql`
    mutation updateTitle($input: UpdateTitleInput) {
      updateTitle(input: $input) {
        updated
      }
    }
  `;
  let variables = { id, title };

  // new
  if (!id) {
    mutation = gql`
      mutation saveTitle($input: SaveTitleInput) {
        saveTitle(input: $input) {
          id
        }
      }
    `;
    variables = { title, authorid: 123 };
  }

  const [saveTitle] = useMutation(mutation, {
    update: (cache, { data }) => {
      // eslint-disable-next-line no-shadow
      const { id } = data.saveTitle || data.updateTitle;

      cache.writeQuery({
        query: GET_EXPERIENCE_ID,
        data: { id },
      });
      cb(false);
    },
  });

  const [debouncedCallback] = useDebouncedCallback(() => {
    // show the saving in progress state
    cb(true);

    saveTitle({ variables: { input: variables } });
  }, 5000);

  React.useEffect(() => {
    debouncedCallback();
  }, [title]);

  return '';
};

SaveTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SaveTitle;
