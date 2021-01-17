import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

const DeleteAThought = () => {
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
        console.log("deleted", deleted, thoughtid);
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

  return deleteThought;
}

export default DeleteAThought;