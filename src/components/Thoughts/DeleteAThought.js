import React from "react";
import { useMutation } from 'react-apollo-hooks';
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import { Tooltip, Icon} from '@chakra-ui/core';

const DeleteAThought = ({ slugkey, thoughtid, deletedCb }) => {
  const DELETE_THOUGHT_MUTATION = gql`
    mutation deleteAThought($input: DeleteAThoughtInput) {
      deleteAThought(input: $input) {
        deleted
        thoughtid
      }
    }
  `;

  const [deleteAThought] = useMutation(DELETE_THOUGHT_MUTATION, {
    update: (cached, { data }) => {
      if(data.deleteAThought) {
        const { deleted, thoughtid } = data.deleteAThought;
        if(deleted) {
          deletedCb(thoughtid);
        }
        else {
          console.log("Could not delete a thought.")
        }
      }
    }
  });

  const deleteThought = (slugkey, thoughtid)=> {
    deleteAThought({
      variables: {input: {
        experienceslugkey: slugkey,
        thoughtid: thoughtid,
        thoughtauthoruid: localStorage.get("username")
      
      }}
    })
  }

  return (
    <Tooltip label="Delete this thought">
      <Icon
        size="10px"
        name="delete"
        ml="10px"
        onClick={()=> deleteThought(slugkey, thoughtid)}
      />
    </Tooltip>
  );
}

DeleteAThought.propTypes = {
  slugkey: PropTypes.string.isRequired,
  thoughtid: PropTypes.number.isRequired,
  deletedCb: PropTypes.func.isRequired
}

export default DeleteAThought;