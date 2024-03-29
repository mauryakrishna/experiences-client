import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';
import history from '../../history';
import { Tooltip, Icon, AlertPrompt } from '../../components/UIElements';

const AuthorActions = ({ slugkey, onDeleteExperienceCb }) => {
  const [isAlertPromptOpen, setAlertPropmtOpen] = useState(false);
  const edit = () => {
    history.push(`/edit/${slugkey}`);
  };

  const mutaton = gql`
    mutation deleteAnExperience($input: DeleteExperienceInput) {
      deleteAnExperience(input: $input) {
        deleted
        slugkey
      }
    }
  `;

  const [deleteAnExperience] = useMutation(mutaton, {
    update: (cached, { data }) => {
      if (data.deleteAnExperience) {
        const { deleted, slugkey } = data.deleteAnExperience;
        if (deleted) {
          // refresh the list
          onDeleteExperienceCb(slugkey);
        }
      }
    },
  });

  const deleteExp = () => {
    deleteAnExperience({
      variables: {
        input: { slugkey, authoruid: localStorage.get('username') },
      },
    });
  };

  return (
    <>
      <Tooltip label="Edit">
        <Icon name="edit" onClick={edit} />
      </Tooltip>
      <Tooltip label="Delete">
        <Icon
          name="delete"
          onClick={() => {
            setAlertPropmtOpen(true);
          }}
        />
      </Tooltip>
      <AlertPrompt
        {...{
          isOpen: isAlertPromptOpen,
          header: 'Delete an Experience',
          body:
            'Experience will be lost forever once deleted. Would you still like to delete?',
          cancelBtnText: 'Cancel',
          yesBtnText: 'Delete',
          onCancel: () => {
            setAlertPropmtOpen(false);
          },
          onYes: () => {
            deleteExp();
            setAlertPropmtOpen(false);
          },
        }}
      />
    </>
  );
};

AuthorActions.propTypes = {
  slugkey: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired
};
export default AuthorActions;
