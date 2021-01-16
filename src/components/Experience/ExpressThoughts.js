import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import WriteEditor from '../PureEditors/WriteEditor';

import Button from '../UIElements/Button';

const ExpressThoughts = ({ slugkey, thoughtauthoruid }) => {
  const [value, setValue] = useState('');

  const SAVE_NEW_THOUGHT_MUTATION = gql`
    mutation saveNewThought($input: SaveNewThoughtInput) {
      saveNewThought(input: $input) {
        saved
      }
    }
  `;

  const [saveNewThoughtMutation] = useMutation(SAVE_NEW_THOUGHT_MUTATION, {
    update: (cached, { data }) => {
      if(data.saveNewThought) {
        const { saved } = data.saveNewThought;
        console.log("Saved", saved);
      }
    }
  })

  const saveNewThought = async () => {    
    saveNewThoughtMutation({
      variables: {
        input: { experienceslugkey: slugkey, thought: JSON.stringify(value), thoughtauthoruid }
      }
    })
  }

  return (
    <>
      <WriteEditor
        onChangeCb={(newValue)=> {setValue(newValue)}}
        placeholder="express your thoughts.."
        style={{ fontSize: '1.1rem', fontWeight: '400' }}
      />
      <Button 
        onClick={saveNewThought} 
        variantColor="teal"
        variant="outline"
      >
        Save
      </Button>
    </>
  );
}

ExpressThoughts.propTypes = {
  slugkey: PropTypes.string.isRequired,
  thoughtauthoruid: PropTypes.string.isRequired
};

export default ExpressThoughts;