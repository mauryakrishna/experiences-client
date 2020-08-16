import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Login from './Login';

export default () => {
  const [authorname, setAuthorname] = useState('');
  const [isvalid, setIsValid] = useState(false);

  const VERIFYME_QUERY = gql`
    query verifyMe {
      verifyMe {
        valid
        displayname
      }
    }
  `;
  const { loading, data } = useQuery(VERIFYME_QUERY);

  useEffect(() => {
    if (data && data.verifyMe) {
      const { valid, displayname } = data.verifyMe;
      // if token not valid
      if (!valid) {
        // clear cookie from client side
      } else {
        setAuthorname(displayname);
        setIsValid(valid);
      }
    }
  }, [data]);

  if (loading) {
    return <span>...</span>;
  }

  return <>{isvalid ? <span>{authorname}</span> : <Login />}</>;
};
