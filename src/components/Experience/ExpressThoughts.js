import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import WriteEditor from '../PureEditors/WriteEditor';
import gqloverhttp from '../../gqloverhttp';

import Button from '../UIElements/Button';

const ExpressThoughts = ({ slugkey, thoughtauthoruid }) => {
  const [value, setValue] = useState('');

  const saveNewThought = async () => {
    const SAVE_NEW_THOUGHT_MUTATION = gql`
      mutation saveNewThought($input: SaveNewThoughtInput) {
        saveNewThought(input: $input) {
          saved
        }
      }
    `;

    const variables = { input: { experienceslugkey: slugkey, thought: value, thoughtauthoruid}};
    const response = await gqloverhttp({ variables, query: SAVE_NEW_THOUGHT_MUTATION })
    if(response) {
      console.log('savenewthought response', response);
    }
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