import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import WriteEditor from '../PureEditors/WriteEditor';

import Button from '../UIElements/Button';
import uuidv4 from "./../../utils/uuidv4"

const ExpressThoughts = ({ slugkey, thoughtauthoruid, onSaveCb, onCancelCb }) => {
  const initialValue = [
    {
      children: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    },
  ];

  const [slateUuid] = useState(uuidv4())

  const [value, setValue] = useState(initialValue);

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
        onSaveCb(saved);
      }
    }
  })

  const saveNewThought = async () => {    
    saveNewThoughtMutation({
      variables: {
        input: { experienceslugkey: slugkey, thought: JSON.stringify(value), thoughtauthoruid }
      }
    });
  }

  const notNow = () => {
    setValue(initialValue);
    onCancelCb();
  }

  const setEditorContent = (newValue) => {
    // to reun some validation or restrict the content in thoughts section
    // to be done later
    setValue(newValue);
  }

  return (
    <>
      <WriteEditor
        id={`thoughts-section-${slateUuid}`}
        initialValue={value}
        onChangeCb={(newValue)=> {setEditorContent(newValue)}}
        placeholder="express your thoughts.."
        style={{ fontSize: '0.9rem', fontWeight: '400' }}
      />
      <Button 
        onClick={saveNewThought} 
        variantColor="teal"
      >
        Save
      </Button>
      <Button 
        onClick={notNow} 
        variantColor="teal"
      >
        Cancel
      </Button>
    </>
  );
}

ExpressThoughts.propTypes = {
  slugkey: PropTypes.string.isRequired,
  thoughtauthoruid: PropTypes.string.isRequired,
  onSaveCb: ()=> {},
  onCancelCb: ()=> {}
};

export default ExpressThoughts;